import { View, Text, StyleSheet, TextInput,TouchableOpacity, Image,ScrollView, ToastAndroid} from 'react-native'
import React, { useRef,useState } from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';
import { LinearTextGradient } from 'react-native-text-gradient';
import { windowH, windowW } from '../../util/Dimension';
import * as GETAPI from '../../util/fetchApi';
import Feather from 'react-native-vector-icons/Feather';
 const validationSchema = yup.object().shape({
     username: yup
        .string()
        .min(3,({min})=> `Tên đăng nhập ít nhất ${min} ký  tự`)
        .required('Nhập tên đăng nhập !')
        .test("username_async_validation", "Tài khoản đã tồn tại",async function (value) {
                // console.log(value)
                let res = await GETAPI.postDataAPI("/user/checkUsername",{'username':`${value}`});
                // console.log(res)
                if(res.msg==="The Username already in use"){
                    return false
                }else{
                    return true
                }          
        }),

    firstName: yup
        .string()
        .min(2,({min})=> `Tên ít nhất ${min} ký  tự`)
        .required('Nhập họ!'),
     lastName: yup
        .string()
        .min(3,({min})=> `Họ đệm ít nhất ${min} ký  tự`)
        .required('Nhập tên!'),
    email: yup
        .string()
        .email('nhập đúng định dạng email!')
        .required('Nhập email!')
        .test("Email_async_validation", "Email đã tồn tại",async function (value) {
            console.log(value)
            let res = await GETAPI.postDataAPI("/user/checkEmail",{'email':value});
            console.log(res)
            if(res.msg==="The Email already in use"){
                return false
            }else{
                return true
            }          
    }),       
    password: yup
        .string()
        .min(6,({min})=> `Mật khẩu ít nhất ${min} ký  tự`)
        .required('Nhập mật khẩu!'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Vui lòng nhập trùng khớp mật khẩu!')
        .required('Xác nhận mật khẩu!'),
 })

export default function Register({navigation}) {
    const [showPass, setshowPass] = useState(true)
    const [showPassConfirm, setshowPassConfirm] = useState(true)
    const formRef = useRef();


    const handleSignUp = async (value)=>{
        // console.log(formRef.current.values.username)
        console.log(value)
        const res = await GETAPI.postDataAPI("/user/register",{'data':value});
        console.log('ddaay laf log',res)
        console.log('day laf log',res)
        if(res.msg==='Success'){
            ToastAndroid.showWithGravity(
                "Đăng ký tài khoản thành công!",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            )
            navigation.replace('login',{
                username: formRef.current.values.username,
                password: formRef.current.values.password,
            })
        }
    }
  return (
    <View style={styles.container}>
        <Image 
            source={require('../../../assets/img/logo_space.png')}
            style={{ width: windowW*0.15, height: windowH*0.15, }}
            resizeMode="cover"
            />
        <LinearTextGradient
            style={{fontSize:20, fontWeight: 'bold',marginBottom:20}}
            locations={[0,1]}
            colors={['red','blue']}
            start={{ x:0, y:0 }}
            end={{ x:1, y: 0 }}
            >
            <Text>
                SPACE SOCIAL
            </Text>
    </LinearTextGradient>
        {/* register form */}
        <Formik
            validationSchema={validationSchema}
            innerRef={formRef}
            initialValues={{ username:'', firstName:'', lastName:'', email:'', password:'', confirmPassword:'' }}
            onSubmit={handleSignUp}
            >
            {({ 
                handleChange,
                handleBlur, 
                handleSubmit,
                values,
                errors,
                touched
             }) => (
                <View style={styles.form}>
                    <ScrollView style={{ paddingHorizontal: 5 }}>
                        <TextInput
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            placeholder={'Tên đăng nhập'}
                            value={values.username}
                            style={(errors.username && touched.username) ? {...styles.Textinput, borderColor: 'red'}:styles.Textinput }
                        />
                        {(errors.username && touched.username)&& 
                            <Text style={styles.err}>{errors.username}</Text>
                        }
                        <TextInput
                            onChangeText={handleChange('firstName')}
                            placeholder={'Họ'}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                            style={(errors.firstName && touched.firstName) ? {...styles.Textinput, borderColor: 'red'}:styles.Textinput }
                        />
                        {(errors.firstName && touched.firstName)&&
                            <Text style={styles.err}>{errors.firstName}</Text>
                        }
                        <TextInput
                            onChangeText={handleChange('lastName')}
                            placeholder={'Tên'}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                            style={(errors.lastName && touched.lastName) ? {...styles.Textinput, borderColor: 'red'}:styles.Textinput }
                        />
                        {(errors.lastName && touched.lastName)&&
                            <Text style={styles.err}>{errors.lastName}</Text>
                        }
                        <TextInput
                            onChangeText={handleChange('email')}
                            placeholder={'Email'}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            style={(errors.email && touched.email) ? {...styles.Textinput, borderColor: 'red'}:styles.Textinput }
                        />
                        {(errors.email && touched.email)&&
                            <Text style={styles.err}>{errors.email}</Text>
                        }
                        <View style={
                                (errors.password && touched.password)?
                                {...styles.Textinput, flexDirection:'row', justifyContent:'space-between',borderColor:'red'}:
                                {...styles.Textinput, flexDirection:'row', justifyContent:'space-between'}
                                }>
                            <TextInput
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                placeholder={'Mật khấu'}
                                value={values.password}
                                style={styles.inputpassword} 
                                secureTextEntry={showPass}
                            />
                            <TouchableOpacity
                                onPress={()=>{
                                    setshowPass(!showPass)
                                }}
                                style={{ 
                                    marginRight: 8,
                                    justifyContent:'center',
                                    alignItems:'center' }}
                            >
                                {showPass ? <Feather name='eye-off' size={20}/>: <Feather name='eye' size={20}/>} 
                            </TouchableOpacity>
                        </View>
                        {(errors.password && touched.password)&&
                                <Text style={styles.err}>{errors.password}</Text>
                        }
                        <View style={
                                (errors.confirmPassword && touched.confirmPassword)?
                                {...styles.Textinput, flexDirection:'row', justifyContent:'space-between',borderColor:'red'}:
                                {...styles.Textinput, flexDirection:'row', justifyContent:'space-between'}
                                }>
                            <TextInput
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                placeholder={'Nhập lại mật khẩu'}
                                value={values.confirmPassword}
                                style={styles.inputpassword}
                                secureTextEntry={showPassConfirm}
                            />
                            <TouchableOpacity
                                onPress={()=>{
                                setshowPassConfirm(!showPassConfirm)
                                }}
                                style={{ 
                                    marginRight: 8,
                                    justifyContent:'center',
                                    alignItems:'center' }}
                                >
                                {showPassConfirm ? <Feather name='eye-off' size={20}/>: <Feather name='eye' size={20}/>} 
                            </TouchableOpacity>
                        </View>
                        {(errors.confirmPassword && touched.confirmPassword)&&
                                <Text style={styles.err}>{errors.confirmPassword}</Text>
                        }

                        <TouchableOpacity
                            style={{ 
                                    backgroundColor:'blue',
                                    justifyContent:'center',
                                    alignItems: 'center',
                                    borderRadius:8,
                                    height: 40,
                                    marginTop: 15
                                    }}
                            onPress={handleSubmit}
                            >
                            <Text style={{ fontWeight:'bold', fontSize: 14, color:'white' }}>Đăng ký</Text>
                        </TouchableOpacity>                       
                    </ScrollView>
                </View>
            )}
        </Formik>
    </View>
  )
}

// const windowH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    form:{
        flex: 1,
        width: windowW,
        justifyContent:'flex-start',
        alignItems:'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        marginTop: 10,
        padding: 10,
        shadowColor:'#000',
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowOpacity: 0.6,
        shadowRadius: 5,
        elevation: 10
    },
    Textinput: {
        width: windowW*0.8,
        height: 40,
        borderRadius: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'blue',
        paddingHorizontal:10
    },
    inputpassword:{
        width: '85%',
       
    },
    err:{
        color:'red',
        textAlign: 'center'
    }
})
