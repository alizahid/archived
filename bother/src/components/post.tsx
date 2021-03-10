import React, { FunctionComponent, useState } from 'react'
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
// @ts-ignore
import { useNavigation } from 'react-navigation-hooks'
import moment from 'moment'

import { black_close, gray_thumbs_up, pink_thumbs_up } from '../assets'
import { IPost } from '../data'
import { colors, fonts, layout, shadow } from '../styles'

import Button from './button'

interface Props {
  post: IPost
  unlink?: boolean
}

const Post: FunctionComponent<Props> = ({ post, unlink }) => {
  const [visible, setVisible] = useState(false)

  const { push } = useNavigation()

  const { body, comments, created, id, location, rated, rating } = post

  return (
    <>
      <SafeAreaView
        style={[styles.main, unlink && styles.shadow]}
        forceInset={{
          bottom: 'never',
          top: unlink ? 'always' : 'never'
        }}
      >
        <TouchableOpacity style={styles.rating}>
          <Text style={styles.label}>{rating}</Text>
          <Image
            style={styles.icon}
            source={rated ? pink_thumbs_up : gray_thumbs_up}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.details}
          onPress={() => {
            if (!unlink) {
              push('Post', {
                post
              })
            }
          }}
          onLongPress={() => setVisible(true)}
        >
          <Text style={styles.body}>{body}</Text>
          <View style={styles.footer}>
            <Text style={styles.meta}>{location}</Text>
            <Text style={styles.meta}>{moment(created).fromNow()}</Text>
            {comments.length > 0 && (
              <Text style={styles.meta}>{comments.length} comments</Text>
            )}
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={modal.modal}>
          <View style={modal.main}>
            <View style={modal.header}>
              <Text style={modal.title}>Flag this post?</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Image style={modal.close} source={black_close} />
              </TouchableOpacity>
            </View>
            <View style={modal.content}>
              <Text>Yes, it's offensive.</Text>
              <Button style={modal.button} label="Report" />
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'stretch',
    flexDirection: 'row'
  },
  shadow: {
    ...shadow,
    backgroundColor: colors.background
  },
  rating: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: layout.margin
  },
  label: {
    marginBottom: layout.padding
  },
  icon: {
    height: layout.icon.large,
    width: layout.icon.large
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    padding: layout.margin,
    paddingLeft: 0
  },
  body: {
    ...fonts.regular
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: -layout.padding,
    marginTop: layout.padding
  },
  meta: {
    color: colors.textLight,
    fontSize: 12,
    marginLeft: layout.padding
  }
})

const modal = StyleSheet.create({
  modal: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center'
  },
  main: {
    backgroundColor: colors.background,
    borderRadius: layout.border.radius,
    maxHeight: '80%',
    maxWidth: '80%'
  },
  header: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  title: {
    ...fonts.title,
    margin: layout.margin
  },
  close: {
    height: layout.icon.small,
    margin: layout.margin,
    width: layout.icon.small
  },
  content: {
    padding: layout.margin
  },
  button: {
    marginTop: layout.margin
  }
})

export default Post
