import { Avatar, List, Select, Row, Button } from 'antd';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import reportAction from '../../redux/report/actions';

const {
    reportUserListRequest
} = reportAction;

const Users = (props) => {
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');
    const navigate = useNavigate();
    const { reports, params, loading, reportUserListRequest } = { ...props };

    useEffect(() => {
        //console.log(props);
        reportUserListRequest({ pageIndex: 1 });
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
                    reportUserListRequest({
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
                        name: item.first_name + ' ' + item.last_name,
                        email: item.email ? item.email : '',
                        view_count: item.view_count ? item.view_count : '',
                    }
                }) : []}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.key}`} />
                        }
                        title={
                            <Button size="small" type="link" onClick={() => navigate('/reports/profiles/users/' + item.key +'/view')}>{item.name}</Button>
                        }
                        description={
                            <div>
                                <span style={{ marginRight: 20 }}>Email: {item.email}</span>
                                <span style={{ marginRight: 20 }}>Profiles Viewed: {item.view_count}</span>
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
        reports: state.report.get('profileViewUsers'),
        params: state.report.get('params')
    }),
    { reportUserListRequest }
)(Users);