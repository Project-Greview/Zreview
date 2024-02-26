// STYLE
import "../../../assets/styles/pcstyle.css";
// IMAGE

const Section5: React.FC = () => {
  return (
    <div className="pc_section section_5">
      <div className="pc_con">
        <h6 className="section_tit">User Persona</h6>

        <ul className="user_persona_list">
          <li className="flex flex_jc_sb flex_ai_c">
            <div className="avatar_img">
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/man_avatar.png`}
                alt=""
              />
            </div>
            <div className="txt_box">
              <div className="user_info flex">
                <p className="relative">김 양일 (32)</p>
                <p className="job">일러스트레이터</p>
              </div>
              <ul className="persona_data flex flex_wrap_wrap">
                <li className="about">
                  <strong>About</strong>
                  <p>
                    불과 몇 년 전까지만 해도 집에서 멀리 떨어진 인스타그램
                    맛집을 찾아가는 게 취미였던 양일 씨는 요즘 동네 탐방에 푹
                    빠졌다.
                    <br />
                    다른 지역에 사는 지인들과 따로 만남을 가지기 부담스러워진
                    요즘.
                    <br /> 그간 자세히 들여다볼 겨를조차 없었던
                    <span className="point_txt">
                      ‘우리 동네의 가치’를 재발견하는 중
                    </span>
                    이다.
                  </p>
                </li>
                <li className="pain_point">
                  <strong>Pain Point</strong>
                  <ul>
                    <li>리뷰에 광고가 많아서 서치하는 시간이 오래 걸린다.</li>
                    <li>
                      서치해서 나오는 곳들은 이미 너무 유명한 곳이라 메리트가
                      없다.
                    </li>
                  </ul>
                </li>
                <li className="needs">
                  <strong>Needs</strong>
                  <ul>
                    <li>불필요한 서치를 줄이고 쉽게 찾고싶다.</li>
                    <li>영감을 줄 수 있는 특이한 플레이스를 찾고싶다.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
          <li className="flex flex_jc_sb flex_ai_c">
            <div className="avatar_img">
              <img
                src={`${process.env.PUBLIC_URL}/assets/image/woman_avatar.png`}
                alt=""
              />
            </div>
            <div className="txt_box">
              <div className="user_info flex">
                <p className="relative">이 서아 (22)</p>
                <p className="job">대학생</p>
              </div>
              <ul className="persona_data flex flex_wrap_wrap">
                <li className="about">
                  <strong>About</strong>
                  <p>
                    주 1-2회 인스타그램 업로드는 기본. 실시간 있는 장소, 기분
                    모두 스토리로 공유하는 걸 좋아한다.
                    <br /> 코로나로 인해 대학생활은 제대로 못해봤지만, 그래도 집
                    가까운곳에서 최대한 예쁘고 맛있고 신나는건 다 해보고싶다.
                    <br /> 핫한 플레이스는 SNS 채널에 차고 넘쳤지만
                    <span className="point_txt">
                      ‘우리 동네의 핫플’도 많다고!
                    </span>
                  </p>
                </li>
                <li className="pain_point">
                  <strong>Pain Point</strong>
                  <ul>
                    <li>장소검색이 되는 곳만 리뷰 할 수 있다.</li>
                    <li>
                      SNS 업로드하기 위한 희소성있는 예쁜 사진 찍을 곳 찾기가
                      힘들다.
                    </li>
                  </ul>
                </li>
                <li className="needs">
                  <strong>Needs</strong>
                  <ul>
                    <li>
                      지도에 나오지 않는 공간들도 리뷰할 수 있었으면 좋겠다.
                    </li>
                    <li>
                      SNS 업로드 하기 위한 유명하지 않은 장소들을 알고싶다.
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Section5;
