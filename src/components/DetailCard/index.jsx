/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: ${(props) => props.contHeight};
  background-image: linear-gradient(
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 0.2) 40%,
      rgba(0, 0, 0, 0.8) 80%
    ),
    url(${(props) => props.bgPhoto});
  background-position: center center;
  background-size: cover;
  border-radius: 8px;
  box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ContentColumn = styled.div``;

const Title = styled.span`
  font-size: 24px;
  font-weight: 900;
  display: block;
  margin-bottom: 8px;
  color: ${(props) => props.color};
`;

const Subtitle = styled.span`
  font-size: 14px;
  color: ${(props) => props.color};
`;

const TagContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 20px;
  background-color: ${(props) => props.tagBg};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 3px;
  width: 60px;
  border-radius: 3px;
  text-align: center;
  color: ${(props) => props.color};
`;

const TagText = styled.span``;

const IconContainer = styled.div`
  color: white;
`;

const ReviewsContainer = styled.div`
  margin-top: 15px;
  font-size: 10px;
  color: rgba(255, 255, 255, 50);
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

const DetailCard = ({
  title,
  titleColor = 'white',
  subtitleColor = 'white',
  subtitle,
  tag,
  tagBg = '#90d7ff',
  tagColor = 'white',
  bottomIconName,
  bottomIconSize = 1,
  bgPhoto,
  totalReviews,
  ratingAverage,
  contHeight,
}) => (
  <Container bgPhoto={bgPhoto} contHeight={contHeight}>
    {tag && (
      <TagContainer tagBg={tagBg} color={tagColor}>
        <TagText>{tag}</TagText>
      </TagContainer>
    )}
    <Content>
      <ContentColumn>
        {(title || subtitle) && (
          <>
            <Title color={titleColor}>{title}</Title>
            <Subtitle color={subtitleColor}>{subtitle}</Subtitle>
          </>
        )}
        <ReviewsContainer>
          {ratingAverage >= 0 && ratingAverage <= 0.5 && <HalfStar />}
          {ratingAverage > 0.5 && ratingAverage <= 1 && <FullStar />}
          {ratingAverage > 1 && ratingAverage <= 1.5 && (
            <>
              <FullStar />
              <HalfStar />
            </>
          )}
          {ratingAverage > 1.5 && ratingAverage <= 2 && (
            <>
              <FullStar />
              <FullStar />
            </>
          )}
          {ratingAverage > 2 && ratingAverage <= 2.5 && (
            <>
              <FullStar />
              <FullStar />
              <HalfStar />
            </>
          )}
          {ratingAverage > 2.5 && ratingAverage <= 3 && (
            <>
              <FullStar />
              <FullStar />
              <FullStar />
            </>
          )}
          {ratingAverage >= 3 && ratingAverage <= 3.5 && (
            <>
              <FullStar />
              <FullStar />
              <FullStar />
              <HalfStar />
            </>
          )}
          {ratingAverage > 3.5 && ratingAverage <= 4 && (
            <>
              <FullStar />
              <FullStar />
              <FullStar />
              <FullStar />
            </>
          )}
          {ratingAverage > 4 && ratingAverage <= 4.5 && (
            <>
              <FullStar />
              <FullStar />
              <FullStar />
              <FullStar />
              <HalfStar />
            </>
          )}
          {ratingAverage > 4.5 && ratingAverage <= 5 && (
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
      </ContentColumn>
      {bottomIconName && (
        <IconContainer>
          <i className={`${bottomIconName} fa-${bottomIconSize}x`} />
        </IconContainer>
      )}
    </Content>
  </Container>
);

export default DetailCard;
