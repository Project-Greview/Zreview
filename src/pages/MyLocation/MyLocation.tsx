// MODULE

// PROPS TYPE
type MyLocationProps = {};

const MyLocation: React.FC<MyLocationProps> = () => {
  return (
    <div className="my_location_section">
      <p className="sub_tit">현재 접속한 동네 이름 표시</p>
      <p className="sub_tit">우리동네 Best 태그</p>
      <p className="sub_tit">우리동네 실시간 리뷰</p>
    </div>
  );
};

export default MyLocation;
