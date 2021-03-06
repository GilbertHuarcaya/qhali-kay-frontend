/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  background-position: center center;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  min-height: 25rem;
`;

const Content = styled.div`
  width: 100%;
  border-radius: 8px;
  position: relative;
  top: 50px;
  color: white;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(4.4px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 20px;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.07);
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 900;
  color: ${(props) => props.color};
`;

const Subtitle = styled.span`
  margin-top: 8px;
  font-size: 14px;
  display: block;
  color: ${(props) => props.color};
`;

const IconContainer = styled.div`
  cursor: pointer;
  color: ${(props) => props.color};
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
  width: 100%;
`;

const SecondTitle = styled.span`
  font-size: 20px;
  color: ${(props) => props.color};
  display: block;
  font-weight: 500;
`;

const BtnRow = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Btn = styled.span`
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  cursor: pointer;
`;

const ReviewsContainer = styled.div`
  margin-bottom: 15px;
  font-size: 10px;
  color: gray;
  & span:last-child {
    margin-left: 5px;
  }
`;

const StarContainer = styled.span`
  color: #f4d931;
`;

const FullStar = () => (
  <StarContainer>
    <i className="fas fa-star" />
  </StarContainer>
);

const HalfStar = () => (
  <StarContainer>
    <i className="fas fa-star-half" />
  </StarContainer>
);

const HospitalCard = ({
  title,
  subtitle,
  titleColor = 'black',
  subtitleColor = 'gray',
  iconName,
  iconSize = 2,
  iconColor = 'white',
  bgPhoto,
  secondTitle,
  secondTitleColor = '#1F2126',
  btnBg = '#90d7ff',
  btnColor = 'white',
  btnIcon,
  ratingAverage,
  totalReviews,
}) => (
  <Container bgPhoto={bgPhoto}>
    <Top>
      {iconName && (
        <IconContainer color={iconColor}>
          <i className={`${iconName} fa-${iconSize}x`} />
        </IconContainer>
      )}
    </Top>

    {(title || subtitle) && (
      <Content>
        <ReviewsContainer>
          {ratingAverage === 0.5 && <HalfStar />}
          {ratingAverage === 1 && <FullStar />}
          {ratingAverage === 1.5 && (
            <>
              <FullStar />
              <HalfStar />
            </>
          )}
          {ratingAverage === 2 && (
            <>
              <FullStar />
              <FullStar />
            </>
          )}
          {ratingAverage === 2.5 && (
            <>
              <FullStar />
              <FullStar />
              <HalfStar />
            </>
          )}
          {ratingAverage === 3 && (
            <>
              <FullStar />
              <FullStar />
              <FullStar />
            </>
          )}
          {ratingAverage === 3.5 && (
            <>
              <FullStar />
              <FullStar />
              <FullStar />
              <HalfStar />
            </>
          )}
          {ratingAverage === 4 && (
            <>
              <FullStar />
              <FullStar />
              <FullStar />
              <FullStar />
            </>
          )}
          {ratingAverage === 4.5 && (
            <>
              <FullStar />
              <FullStar />
              <FullStar />
              <FullStar />
              <HalfStar />
            </>
          )}
          {ratingAverage === 5 && (
            <>
              <FullStar />
              <FullStar />
              <FullStar />
              <FullStar />
              <FullStar />
            </>
          )}
          {totalReviews && (
            <span>
              {`${totalReviews === 1 ? '1 review' : `${totalReviews} reviews`}`}
            </span>
          )}
        </ReviewsContainer>
        {title && <Title color={titleColor}>{title}</Title>}
        {subtitle && <Subtitle color={subtitleColor}>{subtitle}</Subtitle>}
        {(secondTitle || btnIcon) && (
          <BtnRow>
            {secondTitle && (
              <SecondTitle color={secondTitleColor}>{secondTitle}</SecondTitle>
            )}
            {btnIcon && (
              <Btn color={btnColor} bgColor={btnBg}>
                <i className={btnIcon} />
              </Btn>
            )}
          </BtnRow>
        )}
      </Content>
    )}
  </Container>
);

export default HospitalCard;
