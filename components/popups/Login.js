import { Form, Spin, Icon, Row, Col } from 'antd';
import Heading from "../Heading"
import Input from '../form-components/Input';
import Checkbox from '../form-components/Checkbox';
import { connect } from 'react-redux'
import Button from '../form-components/Button';
import { loginUser } from '../../services/api';
import msgStrings from '../../constants/msgStrings';
import { toggleRegBar, drawerToDisplay } from '../../redux/actions/drawers'
import { setUser } from '../../redux/actions/user'
import regex from '../../services/helpers/regex';
import reactComponentDebounce from 'react-component-debounce';

const DebounceInput = reactComponentDebounce({
    valuePropName: 'value',
    triggerMs: 1000,
  })(Input);

class LoginForm extends React.Component{
    constructor(){
        super()
        this.state = {
            isLoading: false,
            error: null,
            isAlreadyUser: false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            const {
                email, password
            } = values
            this.setState({
                isLoading: true,
                error: null
            })
            loginUser({
                email, password
            })
            .then(res => {
                this.setState({
                    isLoading: false
                })
                console.log({res})
                if(res.status === 200){
                    if(res.data.status){
                        this.props.setUser(res.data.user)
                        this.props.toggleRegBar()
                    }else{
                        const {
                            error, message
                        } = res.data
                        if(message){
                            this.setState({
                                error: message === "User not found" ? msgStrings.LOGIN_ERROR : message 
                            })
                        }else{
                            this.setState({
                                error: error
                            })
                        }
                    }
                }else{

                }
            })
            .catch(err=> {
                console.log({err});
                this.setState({
                    isLoading: false
                })
            })
          }
        });
    }
    render(){
        const {
            drawerToDisplay, 
            form: {
                getFieldDecorator 
            }
        } = this.props
        const {
            isLoading, error, isAlreadyUser
        } = this.state
        
        let finalClass = "c-login";
        if(this.props.consult){
            finalClass += " c-userDetails"
        }
        
        return (
            <div className={finalClass}>
                <Heading parentClass="c-login" >{
                    isAlreadyUser ? <span>Looks like you already<br/>have an account</span> : "Welcome back"
                }</Heading>
                {!isAlreadyUser && <p className="c-login__info">Please login to your account</p>}
    
                {!isAlreadyUser && <Form onSubmit={this.handleSubmit} className="c-ant-from c-login__form" >
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [
                                { required: true, message: 'Please input your e-mail!' },
                                {max:40, message:"You can't use more than 40 characters."},
                                { 
                                    pattern: regex.email, 
                                    message: 'Please enter a valid E-mail!' 
                                },
                            ],
                        })(
                            <DebounceInput versions={["dark"]} parentClass="c-login" label="E-mail" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Please input your password!' },
                                {max:20, message:"You can't use more than 20 characters."}
                            ],
                        })(
                            <DebounceInput type="password" parentClass="c-login" versions={["dark"]} label="Password" />
                        )}
                    </Form.Item>
                    <div className="c-login__forget">
                        <span onClick={()=> {
                            drawerToDisplay("forget")
                        }} className="c-login__link c-login__link--gold" >Forgot Password?</span>
                    </div>
                    <div className="c-login__error-block">
                        {
                            isLoading && <Icon type="loading" className="c-login__spinner c-spinner" style={{ fontSize: 24 }} spin />
                        }
                        {
                            error && <p className="c-login__error">{error}</p>
                        }
                    </div>
                    <div>
                        <p className="c-login__inst">Don't have an account yet. <span 
                            onClick={()=> {
                                drawerToDisplay("register")
                            }}
                            className="c-login__link">REGISTER</span></p>
                    </div>
                    <Button theme='outline-gold' disabled={isLoading} versions={["block"]} >Login</Button>
                </Form>}
                <br/>
                <Row>
                    <Col span={12} className="pr-2">
                        <Button type="button" theme='outline-gold' disabled={isLoading} versions={["block"]} >Login with Google</Button>
                    </Col>
                    <Col span={12} className="pl-2">
                        <Button type="button" theme='outline-gold' disabled={isLoading} versions={["block"]} >Login with Facebook</Button>
                    </Col>
                </Row>
                {isAlreadyUser && <div className="c-login__no-form-wrapper">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                        <p className="c-login__inst">You can login from <span 
                            onClick={()=> {
                                drawerToDisplay("login")
                            }}
                            className="c-login__link">HERE</span></p>
                </div>}
            </div>
        )
    }
}

const Login = Form.create({name: 'login'})(LoginForm)
const mapActionToProps = ({
    setUser, toggleRegBar, drawerToDisplay
})
export default connect(state => state, mapActionToProps)(Login)