import React, { useState } from "react";
import {
	TextInput,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { Formik } from "formik";
import LottieView from "lottie-react-native";

import Screen from "../../components/Screen";
import { signIn, authenticate } from "./AuthAPICalls/authCalls";

const LoginScreen = ({ navigation }) => {
	const [focusName, setFocusName] = useState(false);
	const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);

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
		// console.log(values);
		const { phoneNumber, confirmPassword } = values;
		signIn(phoneNumber, confirmPassword)
			.then((res) => {
				// console.log(res);
				authenticate(res.data, () => {
					navigation.navigate("Home");
				});
			})
			.catch((err) => {
				alert(err);
			});
	};

	return (
		<View style={{ flex: 1 }}>
			{loading === true ? (
				<View style={styles.overlay}>
					<LottieView
						style={styles.lottie}
						autoPlay
						loop
						source={require("../../assets/animations/loader.json")}
					/>
					<Screen>
						<View style={styles.screen}>
							<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
								<View>
									<Text style={styles.heading}>Login</Text>
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
														marginHorizontal: 8,
														marginTop: 24,
														marginBottom: 16,
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
														onChangeText={formikProps.handleChange(
															"phoneNumber"
														)}
														onBlur={onBlurNameChange}
													/>
												</View>

												<View
													style={{
														marginHorizontal: 8,
														marginVertical: 4,
													}}
												>
													<Text style={styles.label}>PASSWORD</Text>
													<TextInput
														underlineColorAndroid="transparent"
														placeholder="Enter your password"
														onFocus={onFocusConfirmPasswordChange}
														autoCorrect={false}
														secureTextEntry={true}
														style={
															focusConfirmPassword === false
																? styles.textInput
																: styles.textConfirmPassword
														}
														onChangeText={formikProps.handleChange(
															"confirmPassword"
														)}
														onBlur={onBlurConfirmPasswordChange}
													/>
												</View>
												<Text style={styles.forgot}>
													Forgot Password {" >"}
												</Text>

												<TouchableOpacity
													onPress={formikProps.handleSubmit}
													style={{
														marginHorizontal: 8,
														marginVertical: 40,
													}}
												>
													<View style={styles.button}>
														<Text style={styles.submit}>Login</Text>
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
											<Text style={styles.submit}>Sign Up</Text>
										</View>
									</TouchableOpacity>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</Screen>
				</View>
			) : (
				<Screen>
					<View style={styles.screen}>
						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							<View>
								<Text style={styles.heading}>Login</Text>
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
													marginHorizontal: 8,
													marginTop: 24,
													marginBottom: 16,
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
												/>
											</View>

											<View
												style={{
													marginHorizontal: 8,
													marginVertical: 4,
												}}
											>
												<Text style={styles.label}>PASSWORD</Text>
												<TextInput
													underlineColorAndroid="transparent"
													placeholder="Enter your password"
													onFocus={onFocusConfirmPasswordChange}
													autoCorrect={false}
													secureTextEntry={true}
													style={
														focusConfirmPassword === false
															? styles.textInput
															: styles.textConfirmPassword
													}
													onChangeText={formikProps.handleChange(
														"confirmPassword"
													)}
													onBlur={onBlurConfirmPasswordChange}
												/>
											</View>
											<Text style={styles.forgot}>Forgot Password {" >"}</Text>

											<TouchableOpacity
												onPress={formikProps.handleSubmit}
												style={{
													marginHorizontal: 8,
													marginVertical: 40,
												}}
											>
												<View style={styles.button}>
													<Text style={styles.submit}>Login</Text>
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
										<Text style={styles.submit}>Sign Up</Text>
									</View>
								</TouchableOpacity>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</Screen>
			)}
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
	},
	lottie: {
		position: "absolute",
		backgroundColor: "rgba(255,255,255,0.5)",
		height: "100%",
		width: "100%",
		zIndex: 10,
	},
	heading: {
		fontFamily: "zilla-bold",
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
		borderBottomColor: "#fc8019",
		borderRadius: 2.5,
	},
	textInputName: {
		fontFamily: "zilla-reg",
		fontSize: 20,
		color: "#bdbdbd",
		paddingVertical: 2,
		borderWidth: 2,
		borderColor: "transparent",
		borderBottomColor: "#fc8019",
		borderRadius: 2.5,
	},

	button: {
		backgroundColor: "#fc8019",
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		padding: 12,
	},
	button1: {
		backgroundColor: "#fc8019",
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
	errMsg: {
		fontFamily: "zilla-reg",
		fontSize: 16,
		color: "red",
		paddingVertical: 4,
		height: 24,
	},
	greenCircle: {
		height: 10,
		width: 10,
		borderRadius: 5,
		backgroundColor: "#90EE90",
		position: "absolute",
		right: "0%",
		top: "12.5%",
	},
	redCircle: {
		height: 10,
		width: 10,
		borderRadius: 5,
		backgroundColor: "#f94d00",
		position: "absolute",
		right: "0%",
		top: "12.5%",
	},
	version: {
		fontFamily: "zilla-med",
		fontSize: 20,
		color: "#d1d1d1",
		textAlign: "center",
		paddingBottom: 24,
		borderBottomWidth: 7.5,
		borderBottomColor: "#edeeef",
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
		width: 155,
		position: "absolute",
		left: 10,
		top: 7.5,
	},
	line2: {
		height: 1,
		backgroundColor: "black",
		width: 155,
		position: "absolute",
		right: 10,
		top: 7.5,
	},
	forgot: {
		fontFamily: "zilla-med",
		fontSize: 18,
		textAlign: "right",
		paddingHorizontal: 8,
		paddingTop: 8,
		color: "#fc8019",
	},
});

export default LoginScreen;
