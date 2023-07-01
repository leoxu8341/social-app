import { Divider, Card, Row, Col, Button, List, Input } from 'antd'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import letterAction from '../../redux/letter/actions'
import moment from 'moment'
import appAction from '../../redux/app/actions'
import messageAction from '../../redux/message/actions'

const { letterOneRequest, letterOpenRequest } = letterAction

const { messageListRequest, messagePostRequest } = messageAction

const { setSidebarKey } = appAction
const { TextArea } = Input
const { Meta } = Card
const Letter = (props) => {
  const [body, setBody] = useState(null)
  const { id } = useParams()
  const {
    letter,
    user,
    loading,
    messageOneLoading,
    messagePostRequest,
    messageLoading,
    messages,
    letterOneRequest,
    messageListRequest,
    setSidebarKey,
    letterOpenRequest,
  } = { ...props }

  useEffect(() => {
    if (id) {
      setSidebarKey('inbox')
      letterOneRequest(id)
      messageListRequest(id)
      letterOpenRequest(id)
    }
  }, [])

  const handleOnClick = () => {
    if (id && body && body !== '') {
      messagePostRequest(id, body)

      setTimeout(() => {
        setBody(null)
      }, 1000)
    }
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            bordered={true}
            style={{
              width: 776,
              marginLeft: 0,
              marginBottom: 10,
            }}
            loading={loading}
          >
            <Meta style={{ marginBottom: 20 }} title={letter ? letter.subject : ''} />
            {letter ? (
              <div>
                {letter.receiver ? (
                  <div>
                    <span style={{ marginRight: 20 }}>
                      From: {letter.sender.first_name + ' ' + letter.sender.last_name}
                    </span>
                    <span style={{ marginRight: 20 }}>
                      Received At:{' '}
                      {moment.parseZone(letter.created_at).format('MM/DD/YYYY HH:mm:ss')}
                    </span>
                  </div>
                ) : (
                  <div>
                    {' '}
                    <span style={{ marginRight: 20 }}>
                      To: {letter.receiver.first_name + ' ' + letter.receiver.last_name}
                    </span>
                    <span style={{ marginRight: 20 }}>
                      Sent At:{' '}
                      {moment.parseZone(letter.created_at).format('MM/DD/YYYY HH:mm:ss')}
                    </span>
                  </div>
                )}
                <p style={{ marginTop: 40 }}>{letter.body}</p>
              </div>
            ) : (
              <div></div>
            )}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List
            loading={messageLoading}
            size="small"
            bordered
            dataSource={
              messages && messages.length > 0
                ? messages.map((item, i) => {
                    return {
                      ...item,
                      key: item.id,
                      body: item.body,
                      isReceived: item.receiver.id === user.id,
                      created_at: item.created_at
                        ? moment.parseZone(item.created_at).format('MM/DD/YYYY HH:mm:ss')
                        : '',
                    }
                  })
                : []
            }
            renderItem={(item) => (
              <List.Item>
                {item.isReceived ? (
                  <Row style={{ width: '100%', textAlign: 'left' }}>
                    <Col span={24}>
                      {item.body} {item.created_at}
                    </Col>
                  </Row>
                ) : (
                  <Row style={{ width: '100%', textAlign: 'right' }}>
                    <Col span={24}>
                      <span style={{ textAlign: 'right' }}>
                        {item.body} {item.created_at}
                      </span>
                    </Col>
                  </Row>
                )}
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Divider orientation="left"></Divider>
      <Row>
        <TextArea
          rows={1}
          placeholder=""
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Button
          loading={messageOneLoading}
          size="small"
          type="primary"
          onClick={() => handleOnClick()}
        >
          Send
        </Button>
      </Row>
    </div>
  )
}
export default connect(
  (state) => ({
    errors: state.letter.get('error'),
    loading: state.letter.get('oneLoading'),
    letter: state.letter.get('letter'),
    messageLoading: state.message.get('loading'),
    messages: state.message.get('messages'),
    messageOneLoading: state.message.get('oneLoading'),
    user: state.auth.get('user'),
  }),
  {
    letterOneRequest,
    setSidebarKey,
    messagePostRequest,
    letterOpenRequest,
    messageListRequest,
  }
)(Letter)
