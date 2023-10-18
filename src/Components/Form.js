import React, { useState, useEffect } from 'react'; 

const App = () => { 
	const [name, setName] = useState(''); 
	const [email, setEmail] = useState(''); 
	const [password, setPassword] = useState(''); 
	const [errors, setErrors] = useState({}); 
	const [isFormValid, setIsFormValid] = useState(false); 

	useEffect(() => { 
		validateForm(); 
	}, [name, email, password]); 
	// Validate form 
	const validateForm = () => { 
		let errors = {}; 

		if (!name) { 
			errors.name = 'Name is required.'; 
		} 

		if (!email) { 
			errors.email = 'Email is required.'; 
		} else if (!/\S+@\S+\.\S+/.test(email)) { 
			errors.email = 'Email is invalid.'; 
		} 

		if (!password) { 
			errors.password = 'Password is required.'; 
		} else if (password.length < 6) { 
			errors.password = 'Password must be at least 6 characters.'; 
		} 

		setErrors(errors); 
		setIsFormValid(Object.keys(errors).length === 0); 
	}; 
	// Submit 
	const handleSubmit = () => { 
		if (isFormValid) { 
			console.log('Form submitted successfully!'); 
		} else { 
			console.log('Form has errors. Please correct them.'); 
		} 
	}; 

	return ( 
		<div style={styles.container}> 
			<div style={styles.form}> 
				<h1 style={styles.heading}> 
					Geeksforgeeks || Form Validation In Next.js 
				</h1> 
				<h3 style={styles.subHeading}>Login Page</h3> 
				<input 
					style={styles.input} 
					placeholder="Name"
					value={name} 
					onChange={(e) => setName(e.target.value)} 
				/> 
				{errors.name && <p style={styles.error}>{errors.name}</p>} 
				<input 
					style={styles.input} 
					placeholder="Email"
					value={email} 
					onChange={(e) => setEmail(e.target.value)} 
				/> 
				{errors.email && <p style={styles.error}>{errors.email}</p>} 
				<input 
					style={styles.input} 
					placeholder="Password"
					value={password} 
					onChange={(e) => setPassword(e.target.value)} 
					type="password"
				/> 
				{errors.password && <p style={styles.error}>{errors.password}</p>} 
				<button 
					style={{ ...styles.button, opacity: isFormValid ? 1 : 0.5 }} 
					disabled={!isFormValid} 
					onClick={handleSubmit} 
				> 
					Submit 
				</button> 
			</div> 
		</div> 
	); 
}; 

const styles = { 
	container: { 
		display: 'flex', 
		alignItems: 'center', 
		justifyContent: 'center', 
		minHeight: '100vh', 
		backgroundColor: '#f0f0f0', 
	}, 
	heading: { 
		fontWeight: 'bold', 
		fontSize: '25px', 
		color: "green", 
		textAlign: "center", 
	}, 
	subHeading: { 
		fontWeight: 'bold', 
		fontSize: '25px', 
		textAlign: "center", 

	}, 
	form: { 
		backgroundColor: '#fff', 
		padding: '20px', 
		borderRadius: '8px', 
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
		width: '100%', 
		maxWidth: '400px', 
		margin: '0 auto', 
	}, 
	input: { 
		width: '100%', 
		padding: '12px', 
		marginBottom: '12px', 
		border: '1px solid #ccc', 
		borderRadius: '10px', 
		fontSize: '16px', 
		transition: 'border-color 0.2s ease', 
	}, 
	button: { 
		backgroundColor: 'green', 
		color: '#fff', 
		fontWeight: 'bold', 
		fontSize: '16px', 
		padding: '12px', 
		border: 'none', 
		borderRadius: '10px', 
		cursor: 'pointer', 
		width: '40%', 
		transition: 'opacity 0.2s ease', 
	}, 
	error: { 
		color: 'red', 
		fontSize: '14px', 
		marginBottom: '6px', 
	}, 
}; 

export default App;
