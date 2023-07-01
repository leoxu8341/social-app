import { Tag, Avatar, Card, Row, Col, Button, Modal, Input } from 'antd'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import profileAction from '../../redux/profiles/actions'
import letterAction from '../../redux/letter/actions'
import notification from '../../notification'
import appAction from '../../redux/app/actions'

const { profileOneRequest } = profileAction
const { setSidebarKey } = appAction
const { letterPostRequest } = letterAction
const { TextArea } = Input
const { Meta } = Card
const ProfileDetail = (props) => {
  const [visible, setVisible] = useState(false)
  const [subject, setSubject] = useState(null)
  const [body, setBody] = useState(null)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { id } = useParams()
  const { profile, loading, profileOneRequest, letterPostRequest, setSidebarKey } = {
    ...props,
  }

  useEffect(() => {
    if (id) {
      setSidebarKey('users')
      profileOneRequest(id)
    }
  }, [])

  const handleOnClick = () => {
    if (profile && profile.user) {
      setSubject(null)
      setBody(null)
      setVisible(true)
    }
  }

  const handleOk = () => {
    setConfirmLoading(true)
    if (profile && profile.user && subject && body) {
      letterPostRequest(profile.user.id, subject, body)
      notification('info', 'Sending...', 'Please wait...', 120, 'topRight')
    }

    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }
  const handleCancel = () => {
    console.log('Clicked cancel button')
    setVisible(false)
  }

  return (
    <Row gutter={16}>
      <Col span={16}>
        <Card
          bordered={true}
          style={{
            width: 600,
            marginLeft: 40,
            marginBottom: 80,
          }}
          loading={loading}
        >
          <Meta
            avatar={
              <Avatar
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${id}`}
              />
            }
            title={
              profile && profile.user
                ? profile.user.first_name + ' ' + profile.user.last_name
                : ''
            }
          />
          {profile && profile.user ? (
            <div>
              <p>Age: {profile.age}</p>
              <p>Gender: {profile.gender}</p>
              <p>
                Height: {profile.height_feet}'{profile.height_inch}"
              </p>
              <p>Location: {profile.state}</p>
              <p>
                <span>Hobbies: </span>
                {profile.profile_to_hobbies && profile.profile_to_hobbies.length > 0
                  ? profile.profile_to_hobbies.map((item, i) => {
                      return (
                        <Tag key={item.id} color="blue">
                          {item.hobby.name}
                        </Tag>
                      )
                    })
                  : null}
              </p>
            </div>
          ) : (
            <div></div>
          )}
        </Card>
        <Button style={{ marginLeft: 50 }} type="primary" onClick={() => handleOnClick()}>
          Write Letter
        </Button>
        <Modal
          okText="Send"
          title="Letter"
          open={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          width={600}
          maskClosable={false}
        >
          <Row style={{ marginBottom: 20 }}>
            <Col span={4}>
              <label>Subject:</label>
            </Col>
            <Col span={20}>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
            </Col>
          </Row>
          <Row>
            <TextArea
              rows={8}
              placeholder="body goes here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Row>
        </Modal>
      </Col>
    </Row>
  )
}
export default connect(
  (state) => ({
    errors: state.profile.get('error'),
    loading: state.profile.get('oneLoading'),
    profile: state.profile.get('profile'),
    id: state.profile.get('id'),
  }),
  {
    profileOneRequest,
    letterPostRequest,
    setSidebarKey,
  }
)(ProfileDetail)
