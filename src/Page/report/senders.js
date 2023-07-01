import { Avatar, List, Select, Row, Col } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { useState, useEffect } from 'react';
import reportAction from '../../redux/report/actions';

const {
    reportSenderListRequest
} = reportAction;

const Senders = (props) => {
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');
    const [read, setRead] = useState(null);

    const { reports, params, loading, reportSenderListRequest } = { ...props };

    useEffect(() => {
        //console.log(props);
        reportSenderListRequest({pageIndex: 1});
    }, []);

    const handleChange = (value) => {
        if (value === 'total') {
            setRead(null);
        } else {
            setRead(value);
        }
        
        reportSenderListRequest({
            ...params,
            pageIndex: 1,
            read: value
        });
    };

    return (
        <div style={{width: '100%'}}>
        <Row>
            <Col span={8}>
                    <Select
                        defaultValue="total"
                        style={{
                            width: '80%',
                            marginBottom: 20
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'total',
                                label: 'Total',
                            },
                            {
                                value: true,
                                label: 'Letters Read',
                            },
                            {
                                value: false,
                                label: 'Letters Unread',
                            }
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
                            current: reports ? reports.current_page_number : 1,
                            defaultPageSize: reports ? reports.num_items_per_page : 20,
                            total: reports ? reports.total_count : 0,
                            onChange: pageIndex => {
                                reportSenderListRequest({
                                    ...params,
                                    pageIndex,
                                    read
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
                                    letter_count: item.letter_count ? item.letter_count : '',
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
                                            <span style={{ marginRight: 20 }}>Email: {item.email}</span>
                                            <span style={{ marginRight: 20 }}>Letters Sent: {item.letter_count}</span>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Col>
        
        </Row>
        </div>

    );
};
export default connect(
    state => ({
        errors: state.report.get('error'),
        loading: state.report.get('loading'),
        reports: state.report.get('senders'),
        params: state.report.get('params')
    }),
    { reportSenderListRequest }
)(Senders);