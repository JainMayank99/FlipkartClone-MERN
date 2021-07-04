import React, { useState } from "react";
import {
	Image,
	TextInput,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	StatusBar,
	Dimensions,
} from "react-native";
import { Formik } from "formik";
import LottieView from "lottie-react-native";
import { Feather } from "@expo/vector-icons";

import { signIn, authenticate } from "./AuthAPICalls/authCalls";

const {height,width}=Dimensions.get('screen')
const LoginScreen = ({ navigation }) => {
	const logo = {
		uri: require("../../assets/animations/logo.png"),
	  };
	const [focusName, setFocusName] = useState(false);
	const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(0);
	const [visibility, setVisibility] = useState(false);

	const onFocusNameChange = () => {
		setFocusName(true);
	};
	const onBlurNameChange = () => {
		setFocusName(false);
	};
	const onFocusConfirmPasswordChange = () => {
		setFocusConfirmPassword(true);
	};
	const onBlurConfirmPasswordChange = () => {
		setFocusConfirmPassword(false);
	};

	const apicall = (values) => {
		const { phoneNumber, confirmPassword } = values;
		setLoading(1)
		signIn(phoneNumber, confirmPassword)
			.then((res) => {
				authenticate(res.data, () => {
					navigation.navigate("Home");
				});
			})
			.catch((err) => {
				setLoading(2)
				setTimeout(() => {
					setLoading(0)
				  }, 1000);
			});
	};

	return (
		<View style={loading !== 0 ? styles.overlay : { flex: 1,backgroundColor:'white' }}>
			<StatusBar hidden />
			{loading !== 0 ? (
				<LottieView
					style={styles.lottie}
					autoPlay
					loop={false}
					source={
						loading === 1
						  ? require("../../assets/animations/loader.json")
						  : require("../../assets/animations/error.json")	  
					  }
				/>
			) : null}

			<View style={styles.screen}>
			<View style={{flex: 1,alignItems:'center',marginVertical:2}}>
			<Image
            source={logo.uri}
            style={{ 
              width: 200,
              height: 200,
            }}
          />
		  </View>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View>
						<Text style={styles.heading}>Sign In</Text>
						<Formik
							initialValues={{ phoneNumber: "", confirmPassword: "" }}
							onSubmit={(values, actions) => {
								setLoading(true);
								apicall(values);
							}}
						>
							{(formikProps) => (
								<React.Fragment>
									<View
										style={{
											marginHorizontal: width*0.0204,
											marginTop: width*0.0611,
											marginBottom: width*0.0406,
										}}
									>
										<Text style={styles.label}>PHONE NUMBER</Text>
										<TextInput
											underlineColorAndroid="transparent"
											onFocus={onFocusNameChange}
											placeholder="Enter your registered number"
											autoCorrect={false}
											keyboardType="number-pad"
											style={
												focusName === false
													? styles.textInput
													: styles.textInputName
											}
											onChangeText={formikProps.handleChange("phoneNumber")}
											onBlur={onBlurNameChange}
											value={formikProps.values.phoneNumber}
										/>
									</View>

									<View
										style={{
											marginHorizontal: width*0.0204,
											marginVertical: height*0.0051,
										}}
									>
										<Text style={styles.label}>PASSWORD</Text>
										<TextInput
											value={formikProps.values.confirmPassword}
											underlineColorAndroid="transparent"
											placeholder="Enter your password"
											onFocus={onFocusConfirmPasswordChange}
											autoCorrect={false}
											secureTextEntry={visibility ? false : true}
											keyboardType="default"
											style={
												focusConfirmPassword === false
													? styles.textInput
													: styles.textConfirmPassword
											}
											onChangeText={formikProps.handleChange("confirmPassword")}
											onBlur={onBlurConfirmPasswordChange}
										/>
										<TouchableOpacity
											style={styles.icon}
											onPress={() => setVisibility(!visibility)}
										>
											<Feather
												name={visibility ? "eye" : "eye-off"}
												size={20}
											/>
										</TouchableOpacity>
									</View>
									<Text style={styles.forgot}>Forgot Password {" >"}</Text>

									<TouchableOpacity
										onPress={formikProps.handleSubmit}
										style={{
											marginHorizontal: width*0.0204,
											marginVertical: height*0.051,
										}}
									>
										<View style={styles.button}>
											<Text style={styles.submit}>SIGN IN</Text>
										</View>
									</TouchableOpacity>
								</React.Fragment>
							)}
						</Formik>
						<View style={styles.footer}>
							<Text style={styles.or}>OR</Text>
							<View style={styles.line1}></View>
							<View style={styles.line2}></View>
						</View>
						<TouchableOpacity
							style={{
								marginHorizontal: 8,
								marginVertical: 40,
							}}
							onPress={() => navigation.navigate("Verification")}
						>
							<View style={styles.button1}>
								<Text style={styles.submit}>SIGN UP</Text>
							</View>
						</TouchableOpacity>
					</View>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		padding: 16,
		flex: 1,
		justifyContent: "center",
	},
	overlay: {
		position: "relative",
		height: "100%",
		width: "100%",
		zIndex: 10,
		backgroundColor:'white' 
	},
	lottie: {
		position: "absolute",
		backgroundColor: "rgba(255,255,255,0.5)",
		height: "100%",
		width: "100%",
		zIndex: 10,
	},
	heading: {
		fontFamily: "zilla-med",
		fontSize: 28,
		paddingVertical: 8,
	},
	label: {
		fontFamily: "zilla-reg",
		fontSize: 16,
		paddingTop: 4,
		letterSpacing: 0.75,
	},
	textInput: {
		fontFamily: "zilla-reg",
		fontSize: 20,
		color: "#bdbdbd",
		paddingVertical: 2,
		borderWidth: 2,
		borderColor: "transparent",
		borderBottomColor: "#bdbdbd",
		borderRadius: 2.5,
		position: "relative",
	},
	textConfirmPassword: {
		fontFamily: "zilla-reg",
		fontSize: 20,
		color: "#bdbdbd",
		paddingVertical: 2,
		borderWidth: 2,
		borderColor: "transparent",
		borderBottomColor: '#FF6B3C',
		borderRadius: 2.5,
	},
	textInputName: {
		fontFamily: "zilla-reg",
		fontSize: 20,
		color: "#bdbdbd",
		paddingVertical: 2,
		borderWidth: 2,
		borderColor: "transparent",
		borderBottomColor: '#FF6B3C',
		borderRadius: 2.5,
	},

	button: {
		backgroundColor: '#FF5D42',
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		padding: 12,
	},
	button1: {
		backgroundColor: '#FF5D42',
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		padding: 12,
		marginTop: 12,
	},
	submit: {
		fontFamily: "zilla-reg",
		fontSize: 20,
		color: "white",
	},


	footer: {
		flex: 1,
		alignItems: "center",
		position: "relative",
	},
	or: {
		fontFamily: "zilla-med",
		fontSize: 18,
	},
	line1: {
		height: 1,
		backgroundColor: "black",
		width: width*0.395,
		position: "absolute",
		left: width*0.0255,
		top: 7.5,
	},
	line2: {
		height: 1,
		backgroundColor: "black",
		width: width*0.395,
		position: "absolute",
		right: width*0.0255,
		top: 7.5,
	},
	forgot: {
		fontFamily: "zilla-reg",
		fontSize: 18,
		textAlign: "right",
		paddingHorizontal: 8,
		paddingTop: 8,
		color: '#FF5D42',
	},
	icon: {
		position: "absolute",
		right: 0,
		top: 25,
	},
});

export default LoginScreen;
