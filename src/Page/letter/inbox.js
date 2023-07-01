import { Badge, List, Select, Row, Col, Space, Button } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import letterAction from '../../redux/letter/actions'
import appAction from '../../redux/app/actions'
const { letterListRequest, letterOneRequest, letterOpenRequest } = letterAction

const { setSidebarKey } = appAction

const Inbox = (props) => {
  const [position, setPosition] = useState('bottom')
  const [align, setAlign] = useState('center')
  const [receiver, setReceiver] = useState(true)
  const navigate = useNavigate()
  const { letters, loading, letterListRequest, letterOpenRequest, setSidebarKey } = {
    ...props,
  }

  useEffect(() => {
    setSidebarKey('inbox')
    letterListRequest({ receiver: true, pageIndex: 1 })
  }, [])

  const handleChange = (value) => {
    setReceiver(value)

    letterListRequest({
      pageIndex: 1,
      receiver: value,
    })
  }

  const handleOnClick = (key, opened) => {
    navigate('/letters/' + key)
    if (!opened) {
      letterOpenRequest(key)
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <Row>
        <Col span={8}>
          <Select
            defaultValue={true}
            style={{
              width: '80%',
              marginBottom: 20,
            }}
            onChange={handleChange}
            options={[
              {
                value: true,
                label: 'Letters Received',
              },
              {
                value: false,
                label: 'Letters Sent',
              },
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <List
            loading={loading}
            pagination={{
              position,
              align,
              showSizeChanger: false,
              defaultCurrent: 1,
              current: letters ? letters.current_page_number : 1,
              defaultPageSize: letters ? letters.num_items_per_page : 20,
              total: letters ? letters.total_count : 0,
              onChange: (pageIndex) => {
                letterListRequest({
                  pageIndex,
                  receiver,
                })
              },
            }}
            dataSource={
              letters && letters.items && letters.items.length > 0
                ? letters.items.map((item, i) => {
                    return {
                      ...item,
                      key: item.id,
                      receiver_name:
                        item.receiver.first_name + ' ' + item.receiver.last_name,
                      sender_name: item.sender.first_name + ' ' + item.sender.last_name,
                      subject: item.subject ? item.subject : '',
                      body: item.body ? item.body : '',
                      opened: item.opened,
                      created_at: item.created_at
                        ? moment.parseZone(item.created_at).format('MM/DD/YYYY HH:mm:ss')
                        : '',
                    }
                  })
                : []
            }
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    item.opened ? (
                      <Space> </Space>
                    ) : (
                      <Space>
                        <Badge color="red" />
                      </Space>
                    )
                  }
                  title={
                    <Button
                      size="small"
                      type="link"
                      onClick={() => handleOnClick(item.key, item.opened)}
                    >
                      {item.subject}
                    </Button>
                  }
                  description={
                    <div>
                      {receiver ? (
                        <div>
                          <span style={{ marginRight: 20 }}>
                            From: {item.sender_name}
                          </span>
                          <span style={{ marginRight: 20 }}>
                            Received At: {item.created_at}
                          </span>
                        </div>
                      ) : (
                        <div>
                          {' '}
                          <span style={{ marginRight: 20 }}>
                            To: {item.receiver_name}
                          </span>
                          <span style={{ marginRight: 20 }}>
                            Sent At: {item.created_at}
                          </span>
                        </div>
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  )
}
export default connect(
  (state) => ({
    errors: state.letter.get('error'),
    loading: state.letter.get('loading'),
    letters: state.letter.get('letters'),
  }),
  { letterListRequest, letterOneRequest, letterOpenRequest, setSidebarKey }
)(Inbox)
