import { Tag, Avatar, Card, Row, Col, Button, Drawer, Input, Space, Select, InputNumber } from 'antd';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import profileAction from '../../redux/profiles/actions';
import {states} from '../../static';
import appAction from '../../redux/app/actions';
const { Option } = Select;
const {
    profileMyRequest,
    hobbyListRequest,
    profilePostRequest,
    profileUpdateRequest
} = profileAction;

const { setSidebarKey } = appAction;
const { TextArea } = Input;
const { Meta } = Card;
const Profile = (props) => {
    const [open, setOpen] = useState(false);
    const [age, setAge] = useState(null);
    const [feet, setFeet] = useState(null);
    const [inch, setInch] = useState(null);
    const [gender, setGender] = useState(null);
    const [state, setState] = useState(null);
    const [hobbies, setHobbies] = useState([]);
    
    const { id } = useParams()
    const { profile, hobbyList, setSidebarKey, hobbyLoading, loading, profileMyRequest, hobbyListRequest, profilePostRequest, profileUpdateRequest } = { ...props };

    useEffect(() => {
        setSidebarKey('profile');
        profileMyRequest();
    }, []);


    const handleOk = () => {
        let data = {};
        if (age) {
            data.age = age;
        }
        if (feet) {
            data.height_feet = feet;
        }
        if (inch) {
            data.height_inch = inch;
        }
        if (gender) {
            data.gender = gender;
        }
        if (state) {
            data.state = state;
        }
        if (hobbies && hobbies.length > 0) {
            data.hobbies = hobbies;
        }

        if (Object.keys(data).length) {
              profile ? profileUpdateRequest(data) : profilePostRequest(data);
        }
        
        setTimeout(() => {
            onClose();
            
        }, 2000);
    };

    const showDrawer = () => {
        hobbyListRequest();
        setOpen(true);
        if (profile) {
            setAge(profile.age);
            setFeet(profile.height_feet);
            setInch(profile.height_inch);
            setGender(profile.gender);
            setState(profile.state);

            if (profile.profile_to_hobbies && profile.profile_to_hobbies.length > 0) {
                let defaultHobbies = [];
                profile.profile_to_hobbies.map((item) =>{
                    defaultHobbies.push(item.hobby.id); return;
                })
                setHobbies(defaultHobbies);
            }
            
        }
    };

    const onClose = () => {
        setOpen(false);
        setAge(null);
        setFeet(null);
        setInch(null);
        setGender(null);
        setState(null);
        setHobbies([]);
    };

    const onAgeChange = (value) => {
        setAge(value);
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
        <Row gutter={16}>
            <Col span={16}>
                <Card
                    bordered={true}
                    style={{
                        width: 600,
                        marginLeft: 40,
                        marginBottom: 80
                    }}
                    loading={loading}
                >
                    <Meta
                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${id}`} />}
                        title={profile && profile.user ? profile.user.first_name + ' ' + profile.user.last_name : ''}
                    />
                    {profile && profile.user ?
                        <div>
                            <p>Age: {profile.age}</p>
                            <p>Gender: {profile.gender}</p>
                            <p>Height: {profile.height_feet}'{profile.height_inch}"</p>
                            <p>Location: {profile.state}</p>
                            <p>
                                <span>Hobbies: </span>
                                {profile.profile_to_hobbies && profile.profile_to_hobbies.length > 0 ?
                                    profile.profile_to_hobbies.map((item, i) => {
                                        return <Tag key={item.id} color="blue">{item.hobby.name}</Tag>
                                    }) : null

                                }

                            </p>
                        </div>
                        : <div></div>
                    }

                </Card>
                <Button style={{ marginLeft: 50 }} type="primary" onClick={() => showDrawer()}>
                    {profile ? 'Update Profile': 'Create Profile'}
                </Button>
                <Drawer
                    title="Profile"
                    width={720}
                    onClose={onClose}
                    open={open}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button onClick={handleOk} loading={loading} type="primary">
                                Submit
                            </Button>
                        </Space>
                    }
                >
                    <Row style={{marginBottom: 20}}>
                        <Space>
                            <span>Age: </span>
                            <InputNumber min={1} max={200} defaultValue={age ? age : null} onChange={onAgeChange} />
                        </Space>
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        <Space>
                            <span>Height: </span>
                            <InputNumber min={1} max={8} defaultValue={feet ? feet : null} onChange={onFeetChange} />
                            <InputNumber min={1} max={12} defaultValue={inch ? inch: null} onChange={onInchChange} />
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
                                    width: 600,
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
                </Drawer>
            </Col>
        </Row>


    );
};
export default connect(
    state => ({
        errors: state.profile.get('error'),
        loading: state.profile.get('oneLoading'),
        profile: state.profile.get('myProfile'),
        hobbyList: state.profile.get('hobbies'),
        hobbyLoading: state.profile.get('hobbyLoading')
    }),
    {
        profileMyRequest,
        hobbyListRequest,
        profilePostRequest,
        profileUpdateRequest,
        setSidebarKey
    }
)(Profile);