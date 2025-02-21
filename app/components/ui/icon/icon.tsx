import './icon.css';

import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef } from 'react';
import { type LinksFunction } from 'react-router';

import { type IconName } from '../icons/name';
import iconSpriteHref from '../icons/sprite.svg';

export interface IconProps extends ComponentPropsWithoutRef<'svg'> {
  variant?: 'primary' | 'secondary';
  name: IconName;
  size?: 'xs' | 'sm' | 'md';
}

const links: LinksFunction = () => [{ rel: 'preload', href: iconSpriteHref, as: 'image' }];

const IconWrapper = ({ variant, children }: Pick<IconProps, 'variant' | 'children'>) => {
  if (variant !== 'secondary') {
    return <>{children}</>;
  }

  return <div className="icon__wrapper">{children}</div>;
};

export const Icon = ({
  variant = 'primary',
  name,
  size = 'md',
  className,
  ...props
}: IconProps) => {
  return (
    <IconWrapper variant={variant}>
      <svg
        width="24"
        height="24"
        {...props}
        className={clsx('icon', `icon--${variant}`, `icon--${size}`, className)}
      >
        <use href={`${iconSpriteHref}#${name}`} />
      </svg>
    </IconWrapper>
  );
};

Icon.links = links;
