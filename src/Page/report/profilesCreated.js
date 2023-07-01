import { Avatar, List } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { useState, useEffect } from 'react';
import reportAction from '../../redux/report/actions';
import appAction from '../../redux/app/actions';

const {
    reportProfileListRequest
} = reportAction;

const { setSidebarKey } = appAction;

const ProfilesCreated = (props) => {
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');

    const { reports, params, setSidebarKey, loading, reportProfileListRequest } = { ...props };

    useEffect(() => {
        setSidebarKey('report_profiles_created');
        reportProfileListRequest(params);
    }, []);

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
                onChange: pageIndex => {
                    reportProfileListRequest({
                        ...params,
                        pageIndex
                    })
                },
            }}
            dataSource={reports && reports.items && reports.items.length > 0 ?
                reports.items.map((item, i) => {
                    return {
                        ...item,
                        key: item.id,
                        name: item.user.first_name + ' ' + item.user.last_name,
                        age: item.age ? item.age : '',
                        state: item.state ? item.state : '',
                        height: item.height_feet && item.height_inch ?
                            item.height_feet + "'" + item.height_inch + '"' : '',
                        created_at: item.created_at ? moment.parseZone(item.created_at).format('MM/DD/YYYY HH:mm:ss') : '',
                    }
                }) : []}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.key}`} />
                        }
                        title={
                            <span>{item.name}</span>
                        }
                        description={
                            <div>
                                <span style={{ marginRight: 20 }}>Age: {item.age}</span>
                                <span style={{ marginRight: 20 }}>Gender: {item.gender}</span>
                                <span style={{ marginRight: 20 }}>Height: {item.height}</span>
                                <span style={{ marginRight: 20 }}>Location: {item.state}</span>
                                <span style={{ marginRight: 20 }}>Created At: {item.created_at}</span>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />

    );
};
export default connect(
    state => ({
        errors: state.report.get('error'),
        loading: state.report.get('loading'),
        reports: state.report.get('recentProfiles'),
        params: state.report.get('params')
    }),
    { reportProfileListRequest, setSidebarKey }
)(ProfilesCreated);