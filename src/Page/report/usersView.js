import { List, Avatar, Card } from 'antd'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import reportAction from '../../redux/report/actions'
import appAction from '../../redux/app/actions'
const { reportUserProfileViewRequest } = reportAction
const { setSidebarKey } = appAction

const UsersView = (props) => {
  const { id } = useParams()
  const [position, setPosition] = useState('bottom')
  const [align, setAlign] = useState('center')
  const { reports, loading, params, setSidebarKey, reportUserProfileViewRequest } = {
    ...props,
  }

  useEffect(() => {
    if (id) {
      setSidebarKey('report_profile_view_users')
      reportUserProfileViewRequest(id, { pageIndex: 1 })
    }
  }, [])

  return (
    <List
      loading={loading}
      pagination={{
        position,
        align,
        showSizeChanger: false,
        defaultCurrent: 1,
        current: reports ? reports.current_page_number : 1,
        defaultPageSize: reports ? reports.num_items_per_page : 20,
        total: reports ? reports.total_count : 0,
        onChange: (pageIndex) => {
          reportUserProfileViewRequest(id, {
            ...params,
            pageIndex,
          })
        },
        id: 10,
        profile: {
          id: 205,
          age: 42,
          height_feet: 7,
          height_inch: 12,
          gender: 'male',
          state: 'NH',
          user: {
            id: 209,
            first_name: 'User3firstname',
            last_name: 'User3lastname',
            created_at: '2023-06-26T14:45:54+00:00',
            updated_at: '2023-06-26T14:45:54+00:00',
          },
          created_at: '2023-06-26T14:46:55+00:00',
          updated_at: '2023-06-26T14:46:55+00:00',
        },
        created_at: '2023-06-26T14:46:56+00:00',
        updated_at: '2023-06-26T14:46:56+00:00',
      }}
      dataSource={
        reports && reports.items && reports.items.length > 0
          ? reports.items.map((item, i) => {
              return {
                ...item,
                key: item.id,
                age: item.profile.age ? item.profile.age : '',
                gender: item.profile.gender ? item.profile.gender : '',
                state: item.profile.state ? item.profile.state : '',
                name: item.profile.user.first_name + ' ' + item.profile.user.last_name,
                height:
                  item.profile.height_feet && item.profile.height_inch
                    ? item.profile.height_feet + "'" + item.profile.height_inch + '"'
                    : '',
                viewed_at: item.created_at
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
              <Avatar
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.key}`}
              />
            }
            title={<span>{item.name}</span>}
            description={
              <div>
                <span style={{ marginRight: 20 }}>Age: {item.age}</span>
                <span style={{ marginRight: 20 }}>Gender: {item.gender}</span>
                <span style={{ marginRight: 20 }}>Location: {item.state}</span>
                <span style={{ marginRight: 20 }}>Height: {item.height}</span>
                <span style={{ marginRight: 20 }}>Viewed At: {item.viewed_at}</span>
              </div>
            }
          />
        </List.Item>
      )}
    />
  )
}
export default connect(
  (state) => ({
    errors: state.report.get('error'),
    loading: state.report.get('oneLoading'),
    reports: state.report.get('profileView'),
    params: state.report.get('params'),
  }),
  {
    reportUserProfileViewRequest,
    setSidebarKey,
  }
)(UsersView)
