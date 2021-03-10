import { motion } from 'framer-motion'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const List = styled.ul``

const Item = styled(motion.li)<{
  icon: string
}>`
  align-items: center;
  display: flex;
  font-size: 1rem;
  line-height: 1.5rem;
  list-style: none;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;

  &:before {
    background-image: ${({ icon }) => `url(${icon})`};
    background-size: 1rem;
    content: '';
    height: 1rem;
    margin-right: 1rem;
    width: 1rem;
  }
`

interface Props {
  animationDelay: number
  features: string[]
  icon: string
}

export const Features: FunctionComponent<Props> = ({
  animationDelay,
  features,
  icon
}) => (
  <List>
    {features.map((feature, index) => (
      <Item
        animate={{
          opacity: 1
        }}
        icon={icon}
        initial={{
          opacity: 0
        }}
        key={index}
        transition={{
          delay: index * 0.2 + animationDelay,
          duration: 0.2
        }}>
        {feature}
      </Item>
    ))}
  </List>
)
