import React from "react";

import {realtime} from "../shared/firebase";
import {useSelector} from "react-redux";

const NotiBadge = (props) => {
  const [is_read, setIsRead] = React.useState(true);
  const user_id = useSelector(state => state.user.user.uid);
  const notiCheck = () => {
      props._onClick();
  };

  React.useEffect(() => {
    const notiDB = realtime.ref(`noti/${user_id}`);

    notiDB.on("value", (snapshot) => {
        console.log(snapshot.val());
        
        setIsRead(snapshot.val().read);
        return () => notiDB.off();
    });
  }, []);



  return (
    <React.Fragment>
      <div color="secondary" variant="dot"  onClick={notiCheck}>
        <div>ㅋㅋ</div>
      </div>
    </React.Fragment>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;