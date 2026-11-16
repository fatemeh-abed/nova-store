'use client';

import { useLocale } from 'next-intl';
import { Instagram, Linkedin, Send } from 'lucide-react';

import { Group, GroupTitle, SocialRow, SocialIcon } from './Footer.styles';

export default function FooterSocial() {
  const locale = useLocale();

  const title = locale === 'fa' ? 'شبکه‌های اجتماعی' : 'Social networks';

  return (
    <Group>
      <GroupTitle>{title}</GroupTitle>

      <SocialRow aria-label={title}>
        <SocialIcon aria-label="Instagram">
          <Instagram size={19} />
        </SocialIcon>

        <SocialIcon aria-label="LinkedIn">
          <Linkedin size={19} />
        </SocialIcon>

        <SocialIcon aria-label="Telegram">
          <Send size={19} />
        </SocialIcon>
      </SocialRow>
    </Group>
  );
}
