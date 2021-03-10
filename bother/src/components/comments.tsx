import React, { FunctionComponent, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useMutation, useQuery } from 'react-apollo-hooks'
import { get, orderBy } from 'lodash'
import update from 'immutability-helper'
import moment from 'moment'

import { mutation, query, IComment, IPost } from '../data'
import { colors, fonts, layout } from '../styles'

import Avatar from './avatar'
import Reply from './reply'
import Separator from './separator'

interface Props {
  post: IPost
}

const Comments: FunctionComponent<Props> = ({ post }) => {
  const [replying, setReplying] = useState(false)

  const createComment = useMutation(mutation.createComment)

  const { data, loading, refetch } = useQuery(query.comments, {
    variables: {
      id: post.id
    }
  })

  return (
    <>
      <FlatList
        data={
          orderBy(
            get(data, 'post.comments', []),
            'created',
            'desc'
          ) as IComment[]
        }
        inverted
        ItemSeparatorComponent={Separator}
        keyboardShouldPersistTaps="handled"
        keyExtractor={({ id }) => id}
        onRefresh={refetch}
        refreshing={loading}
        renderItem={({ item }) => (
          <View style={styles.main}>
            <Avatar user={item.user} large />
            <View style={styles.details}>
              <Text style={styles.body}>{item.body}</Text>
              <Text style={styles.meta}>{moment(item.created).fromNow()}</Text>
            </View>
          </View>
        )}
      />
      <Reply
        loading={replying}
        onReply={async body => {
          setReplying(true)

          createComment({
            update(proxy, { data: { createComment } }) {
              setReplying(false)

              proxy.writeQuery({
                data: update(data, {
                  post: {
                    comments: {
                      $push: [createComment]
                    }
                  }
                }),
                query: query.comments,
                variables: {
                  id: post.id
                }
              })
            },
            variables: {
              body,
              post: post.id
            }
          })
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: layout.margin
  },
  details: {
    flex: 1,
    marginLeft: layout.margin
  },
  body: {
    ...fonts.small
  },
  meta: {
    ...fonts.small,
    color: colors.textLight,
    marginTop: layout.padding
  }
})

export default Comments
