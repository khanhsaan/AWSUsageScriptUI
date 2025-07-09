import { useState } from "react";

function LoginForm({ onLogin }) {
    const[credentials, setCredentials] = useState({
        accessKey: '',
        secretKey: '',
        region: 'ap-southeast-2',
    });

    const[isLogginIn, setIsLoggingIn] = useState(false);
    const[error, setError] = useState('');
    
}

export default LoginForm;