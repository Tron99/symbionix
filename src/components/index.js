import React, { Component } from 'react';
import './styles.css';
import FormValidator from './FormValidator';
import Loader from 'react-loader-spinner';
import { FNB_LOANS_RSVP } from '../utilities/share-point-lists';
import pnp, { Web } from 'sp-pnp-js';

const selected_style_option = {
	height: '65px',
	width: '62px',
	background: `url(${require('../images/selected-btn.svg')}) no-repeat center center`
};

const grey_style_option = {
	height: '65px',
	width: '62px',
	background: `url(${require('../images/grey-options.svg')}) no-repeat center center`
};

var submitLoading = false;
const loaderStyles = {
	display: 'flex',
	position: 'absolute'
};

var myOverLay = {
	/* height: 100%; */
	width: '100%',
	background: 'white',
	zIndex: '2',
	display: 'none',
	position: 'absolute',
	top: '0',
	bottom: '0',
	left: '0'
};
class Main extends Component {
	constructor(props) {
		super(props);
		this.validator = new FormValidator([
			{
				field: 'attending',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'firstName',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'secondName',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'cellNumber',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'emailAddr',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'department',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'dietaryRequirement',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'dietStipulation',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'needTransport',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'ownCar',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'needPassForTheVanue',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'FNBDepatureTime',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'eventDepartureTime',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'liquorPolicity',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'indemnityForm',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			},
			{
				field: 'codeOfBehaviour',
				method: 'isEmpty',
				validWhen: false,
				message: 'This field is required.'
			}
		]);
		this.state = {
			attending: '',
			firstName: '',
			secondName: '',
			cellNumber: '',
			emailAddr: '',
			department: '',

			dietaryRequirement: '',
			needTransport: '',
			ownCar: '',
			needPassForTheVanue: '',
			dietStipulation: '',
			FNBDepatureTime: '',
			eventDepartureTime: '',
			liquorPolicity: '',
			indemnityForm: '',
			codeOfBehaviour: '',
			indemnityStyles1: grey_style_option,
			indemnityStyles2: grey_style_option,
			indemnityStyles3: grey_style_option,
			validation: this.validator.valid()
		};
		this.handleIndemnity = this.handleIndemnity.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.formatToPhone = this.formatToPhone.bind(this);
		this.isModifierKey = this.isModifierKey.bind(this);
		this.handelAttending = this.handelAttending.bind(this);
		this.handleDiet = this.handleDiet.bind(this);
		this.handleTransport = this.handleTransport.bind(this);
		this.handleOwnCar = this.handleOwnCar.bind(this);
	}
	handelAttending(e) {
		this.setState({ [e.target.name]: e.target.value }, () => {
			let validation = this.validator.validate(this.state);

			this.setState({ validation });
		});
		if (e.target.value === 'NO') {
			this.setState({
				dietaryRequirement: 'N/A',
				needTransport: 'N/A',
				dietStipulation: 'N/A',
				FNBDepatureTime: 'N/A',
				eventDepartureTime: 'N/A',
				liquorPolicity: 'N/A',
				indemnityForm: 'N/A',
				codeOfBehaviour: 'N/A',
				ownCar: 'N/A',
				needPassForTheVanue: 'N/A'
			});
		}
		if (e.target.value === 'YES') {
			this.setState({
				dietaryRequirement: '',
				needTransport: '',
				dietStipulation: '',
				FNBDepatureTime: '',
				eventDepartureTime: '',
				liquorPolicity: '',
				indemnityForm: '',
				codeOfBehaviour: '',
				ownCar: '',
				needPassForTheVanue: ''
			});
		}

		let validation = this.validator.validate(this.state);

		this.setState({ validation });
	}
	handleDiet(e) {
		this.setState({ [e.target.name]: e.target.value }, () => {
			if (this.state.dietaryRequirement === 'None') {
				this.setState({ dietStipulation: 'N/A' });
			}
			if (this.state.dietaryRequirement !== 'None' && this.state.dietaryRequirement !== '') {
				this.setState({ dietStipulation: 'N/A' });
			}
			let validation = this.validator.validate(this.state);

			this.setState({ validation });
		});
	}
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value }, () => {
			let validation = this.validator.validate(this.state);

			this.setState({ validation });
		});
	}
	handleOwnCar(e) {
		this.setState({ [e.target.name]: e.target.value }, () => {
			if (this.state.ownCar === 'NO') {
				this.setState({ needPassForTheVanue: 'N/A' });
			}
			if (this.state.ownCar === 'YES') {
				this.setState({
					needPassForTheVanue: '',
					needTransport: 'NO'
				});
			}
			let validation = this.validator.validate(this.state);

			this.setState({ validation });
		});
	}

	handleTransport(e) {
		this.setState({ [e.target.name]: e.target.value }, () => {
			if (this.state.needTransport === 'YES') {
				this.setState({ FNBDepatureTime: '', eventDepartureTime: '', ownCar: 'NO', needPassForTheVanue: 'NO' });
			}
			if (this.state.needTransport === 'NO') {
				this.setState({
					FNBDepatureTime: 'N/A',
					eventDepartureTime: 'N/A',
					ownCar: '',
					needPassForTheVanue: ''
				});
			}
			let validation = this.validator.validate(this.state);

			this.setState({ validation });
		});
	}

	handleIndemnity(e) {
		if (e.target.checked) {
			if (e.target.name === 'indemnityStyles1')
				this.setState({ indemnityStyles1: selected_style_option, liquorPolicity: 'YES' }, () => {
					let validation = this.validator.validate(this.state);

					this.setState({ validation });
				});
			if (e.target.name === 'indemnityStyles2')
				this.setState({ indemnityStyles2: selected_style_option, indemnityForm: 'YES' }, () => {
					let validation = this.validator.validate(this.state);

					this.setState({ validation });
				});
			if (e.target.name === 'indemnityStyles3')
				this.setState({ indemnityStyles3: selected_style_option, codeOfBehaviour: 'YES' }, () => {
					let validation = this.validator.validate(this.state);

					this.setState({ validation });
				});
		}
		if (!e.target.checked) {
			if (e.target.name === 'indemnityStyles1')
				this.setState({ indemnityStyles1: grey_style_option, liquorPolicity: '' }, () => {
					let validation = this.validator.validate(this.state);

					this.setState({ validation });
				});
			if (e.target.name === 'indemnityStyles2')
				this.setState({ indemnityStyles2: grey_style_option, indemnityForm: '' }, () => {
					let validation = this.validator.validate(this.state);

					this.setState({ validation });
				});
			if (e.target.name === 'indemnityStyles3')
				this.setState({ indemnityStyles3: grey_style_option, codeOfBehaviour: '' }, () => {
					let validation = this.validator.validate(this.state);

					this.setState({ validation });
				});
		}
	}
	isModifierKey = (event) => {
		const key = event.keyCode;
		return (
			event.shiftKey === true ||
			key === 35 ||
			key === 36 || // Allow Shift, Home, End
			(key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
			(key > 36 && key < 41) || // Allow left, up, right, down
			// Allow Ctrl/Command + A,C,V,X,Z
			((event.ctrlKey === true || event.metaKey === true) &&
				(key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
		);
	};

	formatToPhone = (event) => {
		if (this.isModifierKey(event)) {
			return;
		}

		const target = event.target;
		const input = event.target.value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
		const zip = input.substring(0, 3);
		const last = input.substring(3, 10);

		if (input.length > 3) {
			this.setState({ [target.name]: `(${zip}) - ${last}` });
		} else if (input.length <= 3) {
			this.setState({ [target.name]: `${zip}` });
		}
		let validation = this.validator.validate(this.state);

		this.setState({ validation });
	};
	handleFormSubmit = (event) => {
		event.preventDefault();

		const user = {
			attending: this.state.attending,
			firstName: this.state.firstName,
			secondName: this.state.secondName,
			cellNumber: this.state.cellNumber,
			emailAddr: this.state.emailAddr,
			department: this.state.department,
			dietaryRequirement: this.state.dietaryRequirement,
			needTransport: this.state.needTransport,
			dietStipulation: this.state.dietStipulation,
			FNBDepatureTime: this.state.FNBDepatureTime,
			eventDepartureTime: this.state.eventDepartureTime,
			liquorPolicity: this.state.liquorPolicity,
			indemnityForm: this.state.indemnityForm,
			codeOfBehaviour: this.state.codeOfBehaviour,
			ownCar: this.state.ownCar,
			needPassForTheVanue: this.state.needPassForTheVanue
		};

		let validation = this.validator.validate(user);

		this.setState({ validation });
		console.log(this.state.isInvalid);

		// console.log("validation", validation.isValid);

		if (validation.isValid) {
			submitLoading = true;
			myOverLay = {
				width: '100%',
				background: 'white',
				zIndex: '2',
				display: 'flex',
				position: 'absolute',
				top: '0',
				bottom: '0',
				left: '0',
				right: '0'
			};
			setTimeout(() => {
				delete user.ignore_whitespace;
				FNB_LOANS_RSVP.items
					.add({
						attending: this.state.attending,
						firstName: this.state.firstName,
						secondName: this.state.secondName,
						cellNumber: this.state.cellNumber,
						emailAddr: this.state.emailAddr,
						department: this.state.department,
						dietaryRequirement: this.state.dietaryRequirement,
						needTransport: this.state.needTransport,
						dietStipulation: this.state.dietStipulation,
						FNBDepatureTime: this.state.FNBDepatureTime,
						eventDepartureTime: this.state.eventDepartureTime,
						liquorPolicity: this.state.liquorPolicity,
						indemnityForm: this.state.indemnityForm,
						codeOfBehaviour: this.state.codeOfBehaviour,
						ownCar: this.state.ownCar,
						needPassForTheVanue: this.state.needPassForTheVanue
					})
					.then(() => {
						submitLoading = false;
						window.location.assign('http://fnbloans/SitePages/Thank%20you%20for%20your%20RSVP.aspx');
					});
			}, 5000);
		}
	};

	render() {
		let validation = this.submitted // if the form has been submitted at least once
			? this.validator.validate(this.state) // then check validity every time we render
			: this.state.validation; // otherwise just use what's in state
		return (
			<div id="main-page">
		
				<div className="form-group">
					<div className="input-name">
						<label htmlFor="">Name</label>
					</div>
					<div className="input-value">
						<div className={validation.firstName.isInvalid ? 'has-error' : ''}>
							<input
								type="text"
								value={this.state.firstName}
								onChange={this.handleChange}
								name="firstName"
								id=""
							/>
							<div className="warningText">
								<span className="help-block">{validation.firstName.message}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="input-name">
						<label htmlFor="">Surname</label>
					</div>
					<div className="input-value">
						<div className={validation.secondName.isInvalid ? 'has-error' : ''}>
							<input
								type="text"
								value={this.state.secondName}
								onChange={this.handleChange}
								name="secondName"
								id=""
							/>
							<div className="warningText">
								<span className="help-block">{validation.secondName.message}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="input-name">
						<label htmlFor="">Contact Number</label>
					</div>
					<div className="input-value">
						<div className={validation.cellNumber.isInvalid ? 'has-error' : ''}>
							<input
								type="text"
								value={this.state.cellNumber}
								placeholder="(081) - 7777777"
								onChange={this.formatToPhone}
								name="cellNumber"
								id=""
							/>
							<div className="warningText">
								<span className="help-block">{validation.cellNumber.message}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="input-name">
						<label htmlFor="">Email Address</label>
					</div>
					<div className="input-value">
						<div className={validation.emailAddr.isInvalid ? 'has-error' : ''}>
							<input
								type="text"
								value={this.state.emailAddr}
								onChange={this.handleChange}
								name="emailAddr"
								id=""
							/>
							<div className="warningText">
								<span className="help-block">{validation.emailAddr.message}</span>
							</div>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="input-name">
						<label htmlFor="">Department</label>
					</div>
					<div className="input-value">
						<div className={validation.department.isInvalid ? 'has-error' : ''}>
							<input
								type="text"
								onChange={this.handleChange}
								value={this.state.department}
								name="department"
								id=""
							/>

							<div className="warningText">
								<span className="help-block">{validation.department.message}</span>
							</div>
						</div>
					</div>
				</div>
					<div>
						<div className="form-group">
							<div className="input-name">
								<label htmlFor="">Dietary Requirements</label>
							</div>
							<div className="input-value">
								<div className={validation.dietaryRequirement.isInvalid ? 'has-error' : ''}>
									<select
										className="my-selects"
										onChange={this.handleDiet}
										value={this.state.dietaryRequirement}
										name="dietaryRequirement"
										id=""
									>
										<option className="my-option" value="" selected disabled hidden>
											--Please Select--
										</option>

										<option className="my-option" value="None">
											None
										</option>
										<option className="my-option" value="Halaal">
											Halaal
										</option>
										<option className="my-option" value="Vegetarian">
											Vegetarian
										</option>
										<option className="my-option" value="No Pork">
											No Pork
										</option>
										<option className="my-option" value="Other">
											Other
										</option>
									</select>
									<div className="warningText">
										<span className="help-block">{validation.dietaryRequirement.message}</span>
									</div>
								</div>
							</div>
						</div>
						{this.state.dietaryRequirement !== 'None' &&
						this.state.dietaryRequirement.length > 0 && (
							<div className="form-group">
								<div className="input-name">
									<label htmlFor="">Please Stipulate</label>
								</div>
								<div className="input-value">
									<div className={validation.dietStipulation.isInvalid ? 'has-error' : ''}>
										<textarea
											name="dietStipulation"
											onChange={this.handleChange}
											id=""
											cols="30"
											rows="10"
										/>
										<div className="warningText">
											<span className="help-block">{validation.dietStipulation.message}</span>
										</div>
									</div>
								</div>
							</div>
						)}
						<div className="form-group">
							<div className="input-name">
								<label htmlFor="">Require Transport?</label>
							</div>
							<div className="input-value">
								<div className={validation.needTransport.isInvalid ? 'has-error' : ''}>
									<select
										className="my-selects"
										onChange={this.handleTransport}
										name="needTransport"
										value={this.state.needTransport}
										id=""
									>
										<option className="my-option" value="" selected disabled hidden>
											--Please Select--
										</option>
										<option className="my-option" value="YES">
											YES
										</option>
										<option className="my-option" value="NO">
											NO
										</option>
									</select>
									<div className="warningText">
										<span className="help-block">{validation.needTransport.message}</span>
									</div>
								</div>
							</div>
						</div>
						<div>
							{this.state.needTransport === 'NO' && (
								<div className="form-group">
									<div className="input-name">
										<label htmlFor="">Own Car?</label>
									</div>
									<div className="input-value">
										<div className={validation.ownCar.isInvalid ? 'has-error' : ''}>
											<select
												className="my-selects"
												onChange={this.handleOwnCar}
												name="ownCar"
												value={this.state.ownCar}
												id=""
											>
												<option className="my-option" value="" selected disabled hidden>
													--Please Select--
												</option>
												<option className="my-option" value="YES">
													YES
												</option>
												<option className="my-option" value="NO">
													NO
												</option>
											</select>
											<div className="warningText">
												<span className="help-block">{validation.ownCar.message}</span>
											</div>
										</div>
									</div>
								</div>
							)}
							{this.state.ownCar === 'YES' && (
								<div className="form-group">
									<div className="input-name">
										<label htmlFor="">Need car pass ?</label>
									</div>
									<div className="input-value">
										<div className={validation.needPassForTheVanue.isInvalid ? 'has-error' : ''}>
											<select
												className="my-selects"
												onChange={this.handleChange}
												name="needPassForTheVanue"
												value={this.state.needPassForTheVanue}
												id=""
											>
												<option className="my-option" value="" selected disabled hidden>
													--Please Select--
												</option>
												<option className="my-option" value="YES">
													YES
												</option>
												<option className="my-option" value="NO">
													NO
												</option>
											</select>
											<div className="warningText">
												<span className="help-block">
													{validation.needPassForTheVanue.message}
												</span>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
						{this.state.needTransport === 'YES' && (
							<div>
								<div className="form-group">
									<div className="input-name">
										<label htmlFor="">FNB Depature Time</label>
									</div>
									<div className="input-value">
										<div className={validation.FNBDepatureTime.isInvalid ? 'has-error' : ''}>
											<select
												className="my-selects"
												onChange={this.handleChange}
												name="FNBDepatureTime"
												value={this.state.FNBDepatureTime}
												id=""
											>
												<option className="my-option" value="" selected disabled hidden>
													--Please Select--
												</option>

												<option className="my-option" value="First  Bus leaving: 11:45am">
													First Bus leaving: 11:45am
												</option>
												<option className="my-option" value="Second Bus leaving: !2:00pm">
													Second Bus leaving: 2:00pm
												</option>
											</select>
											<div className="warningText">
												<span className="help-block">{validation.FNBDepatureTime.message}</span>
											</div>
										</div>
									</div>
								</div>
								<div className="form-group">
									<div className="input-name">
										<label htmlFor="">Event Depature Time</label>
									</div>
									<div className="input-value">
										<div className={validation.eventDepartureTime.isInvalid ? 'has-error' : ''}>
											<select
												className="my-selects"
												onChange={this.handleChange}
												name="eventDepartureTime"
												value={this.state.eventDepartureTime}
												id=""
											>
												<option className="my-option" value="" selected disabled hidden>
													--Please Select--
												</option>

												<option className="my-option" value="First Bus leaving: 4:30pm">
													First Bus leaving: 4:30pm
												</option>
												<option className="my-option" value="Second Bus leaving: 6:30pm">
													Second Bus leaving: 6:30pm
												</option>
											</select>
											<div className="warningText">
												<span className="help-block">
													{validation.eventDepartureTime.message}
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
						<div className="indemnity-option">
							<div className="option-helper">
								<span className="exclamation">!</span>Please click on the grey box on the right to
								select
							</div>
							<div className="form-group">
								<div className={'input-label'} htmlFor="">
									I have read and agreed to the <span>Liquor Policy</span>.
								</div>
								<div className="input-value" style={this.state.indemnityStyles1}>
									<div className={validation.liquorPolicity.isInvalid ? 'has-error' : ''}>
										<input
											type="checkbox"
											name="indemnityStyles1"
											value={this.state.liquorPolicity}
											onChange={this.handleIndemnity}
											id=""
										/>
										<div className="warningText">
											<span className="help-block">{validation.liquorPolicity.message}</span>
										</div>
									</div>
								</div>
							</div>
							<div className="form-group">
								<div className={'input-label'} htmlFor="">
									I have read and agreed to the <span>Indemnity Form</span>.
								</div>
								<div className="input-value" style={this.state.indemnityStyles2}>
									<div className={validation.indemnityForm.isInvalid ? 'has-error' : ''}>
										<input
											type="checkbox"
											name="indemnityStyles2"
											value={this.state.indemnityForm}
											onChange={this.handleIndemnity}
											id=""
										/>
										<div className="warningText">
											<span className="help-block">{validation.indemnityForm.message}</span>
										</div>
									</div>
								</div>
							</div>
							<div className="form-group">
								<div className={'input-label'} htmlFor="">
									I have read and understand the <span>Code of Behaviour</span>.
								</div>
								<div className="input-value" style={this.state.indemnityStyles3}>
									<div className={validation.codeOfBehaviour.isInvalid ? 'has-error' : ''}>
										<input
											type="checkbox"
											name="indemnityStyles3"
											value={this.state.codeOfBehaviour}
											onChange={this.handleIndemnity}
											id=""
										/>
										<div className="warningText">
											<span className="help-block">{validation.codeOfBehaviour.message}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
			

				<button className="my-buttons" type="submit" onClick={this.handleFormSubmit} />
				{submitLoading === true && (
					<div className="my-loader">
						<Loader type="Oval" color="#f79020" height="100" width="100" />
					</div>
				)}
				<div style={myOverLay}>
					{' '}
					<div className="loading-text"> Submitting, Please Wait ...</div>
				</div>
			</div>
		);
	}
}

export default Main;
