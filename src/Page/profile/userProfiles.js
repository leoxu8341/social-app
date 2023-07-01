import { Avatar, List, Row, Col, Button, Modal, InputNumber, Space, Select, Input } from 'antd';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import profileAction from '../../redux/profiles/actions';
import {states} from '../../static';
const {
    profileListRequest,
    hobbyListRequest
} = profileAction;

const UserProfiles = (props) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');
    const [params, setParams] = useState(null);
    const [name, setName] = useState(null);
    const [ageMin, setAgeMin] = useState(null);
    const [ageMax, setAgeMax] = useState(null);
    const [feet, setFeet] = useState(null);
    const [inch, setInch] = useState(null);
    const [gender, setGender] = useState(null);
    const [state, setState] = useState(null);
    const [hobbies, setHobbies] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const navigate = useNavigate();
    const { profiles, loading, hobbyLoading, hobbyList, profileListRequest, hobbyListRequest } = { ...props };

    useEffect(() => {
        profileListRequest({pageIndex: 1});
    }, []);

    const resetStates = () => {
        setName(null);
        setAgeMin(null);
        setAgeMax(null);
        setFeet(null);
        setInch(null);
        setGender(null);
        setState(null);
        setHobbies([]);
    }

    const handleOnClick = () => {
        resetStates();
        hobbyListRequest();
        setVisible(true);
    }

    const handleOk = () => {
        setConfirmLoading(true);
        
        let filter = {};
        if (name) {
            filter.name = name;
        }
        if (ageMin) {
            filter.ageMin = ageMin;
        }
        if (ageMax) {
            filter.ageMax = ageMax;
        }
        if (feet) {
            filter.feet = feet;
        }
        if (inch) {
            filter.inch = inch;
        }
        if (gender) {
            filter.gender = gender;
        }
        if (state) {
            filter.state = state;
        }
        if (hobbies) {
            filter.hobbies = hobbies;
        }

        if (filter) {
            setParams(filter)
            profileListRequest({ ...filter, pageIndex: 1 });
        }

        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    const onNameChange = (e) => {
        setName(e.target.value);
    };

    const onAgeMinChange = (value) => {
        setAgeMin(value);
    };

    const onAgeMaxChange = (value) => {
        setAgeMax(value);
    };

    const onFeetChange = (value) => {
        setFeet(value);
    };

    const onInchChange = (value) => {
        setInch(value);
    };

    const onGenderChange = (value) => {
        setGender(value);
    };

    const onStateChange = (value) => {
        setState(value);
    };

    const handleHobbyChange = (value) => {
        setHobbies(value);
    };

    return (
        <div style={{ width: '100%' }}>
            <Row>
                <Col span={8}>
                    <Button style={{ marginLeft: 50 }} type="primary" onClick={() => handleOnClick()}>Filter Profiles</Button>
                </Col>
                <Modal
                    okText="Filter"
                    title=""
                    open={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    width={600}
                    maskClosable={false}
                >
                    <Row style={{ marginBottom: 20 }}>
                        <Space>
                            <span>Name: </span>
                            <Input defaultValue={name ? name : null} onChange={onNameChange} />
                        </Space>
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        <Space>
                            <span>Min Age: </span>
                            <InputNumber min={1} max={200} defaultValue={ageMin ? ageMin : null} onChange={onAgeMinChange} />
                            <span>Max Age: </span>
                            <InputNumber min={1} max={200} defaultValue={ageMax ? ageMax : null} onChange={onAgeMaxChange} />
                        </Space>
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        <Space>
                            <span>Height: </span>
                            <InputNumber min={1} max={8} defaultValue={feet ? feet : null} onChange={onFeetChange} />
                            <InputNumber min={1} max={12} defaultValue={inch ? inch : null} onChange={onInchChange} />
                        </Space>
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        <Space>
                            <span>Gender: </span>
                            <Select
                                defaultValue={gender ? gender : null}
                                style={{
                                    width: 120,
                                }}
                                onChange={onGenderChange}
                                options={[
                                    {
                                        value: 'male',
                                        label: 'Male',
                                    },
                                    {
                                        value: 'female',
                                        label: 'Female',
                                    }
                                ]}
                            />
                        </Space>
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        <Space>
                            <span>State: </span>
                            <Select
                                defaultValue={state ? state : null}
                                style={{
                                    width: 200,
                                }}
                                onChange={onStateChange}
                                options={Object.entries(states).map(([k, v]) => {
                                    return {
                                        value: v,
                                        label: k
                                    }
                                })}
                            />
                        </Space>
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        <Space>
                            <span>Hobbies: </span>
                            <Select
                                loading={hobbyLoading}
                                mode="multiple"
                                allowClear
                                style={{
                                    width: 460,
                                }}
                                placeholder="Please select"
                                defaultValue={hobbies && hobbies.length > 0 ? hobbies : []}
                                onChange={handleHobbyChange}
                                options={hobbyList && hobbyList.length > 0 ?
                                    hobbyList.map((item) => {
                                        return {
                                            value: item.id,
                                            label: item.name
                                        }
                                    }) : []
                                }
                            />
                        </Space>
                    </Row>
                </Modal>
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
                current: profiles ? profiles.current_page_number : 1,
                defaultPageSize: profiles ? profiles.num_items_per_page : 20,
                total: profiles ? profiles.total_count : 0,
                onChange: pageIndex => {
                    profileListRequest({
                        ...params,
                        pageIndex
                    })
                },
            }}
            dataSource={profiles && profiles.items && profiles.items.length > 0 ?
                profiles.items.map((item, i) => {
                    return {
                        ...item,
                        key: item.id,
                        name: item.user.first_name + ' ' + item.user.last_name,
                        age: item.age ? item.age : '',
                        state: item.state ? item.state : '',
                        height: item.height_feet && item.height_inch ?
                            item.height_feet + "'" + item.height_inch + '"' : '',

                    }
                }) : []}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.key}`} />
                        }
                        title={
                            <Button size="small" type="link" onClick={() => navigate('/users/profile/' + item.key)}>{item.name}</Button>

                        }
                        description={
                            <div>
                                <span style={{ marginRight: 20 }}>Age: {item.age}</span>
                                <span style={{ marginRight: 20 }}>Gender: {item.gender}</span>
                                <span style={{ marginRight: 20 }}>Height: {item.height}</span>
                                <span style={{ marginRight: 20 }}>Location: {item.state}</span>
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
        user: state.auth.get('user'),
        errors: state.profile.get('error'),
        loading: state.profile.get('loading'),
        profiles: state.profile.get('profiles'),
        hobbyList: state.profile.get('hobbies'),
        hobbyLoading: state.profile.get('hobbyLoading')
    }),
    { profileListRequest, hobbyListRequest }
)(UserProfiles);