import styled from 'styled-components';
import { Link } from '@/i18n/navigation';

export const Root = styled.footer`
  background: ${({ theme }) => theme.tokens.colors.navy};
  color: #ffffff;
  margin-block-start: 48px;
  padding: 48px 24px 22px;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.tokens.sizes.content};
  margin-inline: auto;

  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 36px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
  text-align: start;
`;

export const BrandGroup = styled(Group)`
  gap: 8px;
`;

export const LogoWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.8;
  color: #d9e1ed;
`;

export const GroupTitle = styled.h3`
  margin: 0 0 4px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.6;
`;

export const FooterLink = styled(Link)`
  color: #d9e1ed;
  text-decoration: none;
  font-size: 13px;
  line-height: 1.7;
  transition: color 0.2s ease;

  &:hover {
    color: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 4px;
    border-radius: 2px;
  }
`;

export const FooterText = styled.span`
  color: #d9e1ed;
  font-size: 13px;
  line-height: 1.7;
`;

export const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const SocialIcon = styled.span`
  width: 38px;
  height: 38px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
`;

export const Bottom = styled.div`
  max-width: ${({ theme }) => theme.tokens.sizes.content};
  margin: 36px auto 0;
  padding-top: 18px;

  border-top: 1px solid rgba(255, 255, 255, 0.18);

  color: #c5cedb;
  font-size: 12px;
  line-height: 1.8;
  text-align: start;
`;
