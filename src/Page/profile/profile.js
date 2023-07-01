import { Avatar, List, Pagination, Button } from 'antd';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import profileAction from '../../redux/profiles/actions';

const {
    profileListRequest
} = profileAction;

const Profile = (props) => {
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');
    const navigate = useNavigate();
    const { profiles, params, loading, profileListRequest } = { ...props };

    useEffect(() => {
        //console.log(props);
        profileListRequest(params);
    }, []);
   
    return (
        
            <List
            loading={loading}
            pagination={{ 
                position, 
                align,
                showSizeChanger: false,
                defaultCurrent: 1,
                current: profiles? profiles.current_page_number : 1,
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
                                <Button size="small" type="link" onClick={()=>navigate('/profile/'+item.key)}>{item.name}</Button>
                              
                            }
                            description={
                                <div>
                                    <span style={{marginRight: 20}}>Age: {item.age}</span>
                                    <span style={{ marginRight: 20 }}>Gender: {item.gender}</span>
                                    <span style={{ marginRight: 20 }}>Height: {item.height}</span>
                                    <span style={{ marginRight: 20 }}>Location: {item.state}</span>
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
        user: state.auth.get('user'),
        errors: state.profile.get('error'),
        loading: state.profile.get('loading'),
        profiles: state.profile.get('profiles'),
        params: state.profile.get('params')
    }),
    { profileListRequest }
)(Profile);