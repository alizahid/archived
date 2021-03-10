import { motion, MotionProps } from 'framer-motion'
import React, { FunctionComponent } from 'react'

interface Props {
  animationDelay: number
}

export const ImageLinks: FunctionComponent<MotionProps & Props> = (props) => (
  <motion.svg {...props} height="680" viewBox="0 0 680 680" width="680">
    <g fill="none" fillRule="evenodd">
      <motion.g
        animate={{
          opacity: 1
        }}
        initial={{
          opacity: 0
        }}
        transition={{
          delay: props.animationDelay,
          duration: 0.2
        }}>
        <circle cx="311" cy="374" r="4.5" stroke="#00b48f" />
        <circle cx="311" cy="374" fill="#f3c25d" fillRule="nonzero" r="2" />
      </motion.g>

      <motion.g
        animate={{
          opacity: 1
        }}
        opacity="0"
        transition={{
          delay: 0.2 + props.animationDelay,
          duration: 0.2
        }}>
        <circle cx="225" cy="395" r="4.5" stroke="#00b48f" />
        <circle cx="225" cy="395" fill="#f3c25d" fillRule="nonzero" r="2" />
      </motion.g>
      <motion.path
        animate={{
          opacity: 1
        }}
        d="m229.5 394 77-18.5"
        opacity="0"
        stroke="#00b48f"
        transition={{
          delay: 0.4 + props.animationDelay,
          duration: 0.2
        }}
      />
      <motion.g
        animate={{
          opacity: 1
        }}
        initial={{
          opacity: 0
        }}
        transition={{
          delay: 0.6 + props.animationDelay,
          duration: 0.2
        }}>
        <circle cx="431" cy="150" r="4.5" stroke="#00b48f" />
        <circle cx="431" cy="150" fill="#f3c25d" fillRule="nonzero" r="2" />
      </motion.g>
      <motion.path
        animate={{
          opacity: 1
        }}
        d="m313.5 370 114.5-216.5"
        opacity="0"
        stroke="#00b48f"
        transition={{
          delay: 0.8 + props.animationDelay,
          duration: 0.2
        }}
      />
    </g>
  </motion.svg>
)
