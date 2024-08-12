import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Checkbox from '../Checkbox';

import passwordGif from '../../assets/gif/password.gif';
import copyIcon from '../../assets/icons/copy.svg';
import refreshIcon from '../../assets/icons/refresh.svg';

import './index.css';

const PasswordGenerator = () => {
    const [passwordLength, setPasswordLength] = useState<number>(10);
    const [password, setPassword] = useState<string>('');
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<string>('Weak');
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: false,
        numbers: false,
        specialChars: true,
    });

    const generatePassword = () => {
        let characters = '';
        if (options.uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.lowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
        if (options.numbers) characters += '0123456789';
        if (options.specialChars) characters += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setPassword(password);
        checkPasswordStrength(password);
        setIsCopied(false)
    };

    const handleCopy = () => {
        setIsCopied(true);
    };

    const onChangePasswordLength = (value: any) => {
        setPasswordLength(value);
    };

    useEffect(() => {
        generatePassword()
    }, [passwordLength, options]);

    const checkPasswordStrength = (password: string) => {
        // console.log('password: ', password);

        if (password.length < 6) {
            setPasswordStrength('Weak');
        } else if (password.length < 10) {
            setPasswordStrength('Medium');
        } else {
            // Check for special characters and numbers
            const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
            const hasNumber = /\d/.test(password);

            if (hasSpecialChar && password.length > 10) {
                setPasswordStrength('Strong');
            } else if (hasNumber && password.length >= 10) {
                setPasswordStrength('Strong');
            } else if (hasNumber && hasSpecialChar && password.length > 15) {
                setPasswordStrength('Very Strong');
            } else {
                setPasswordStrength('Medium');
            }
        }
    };

    const getStrengthClass = () => {
        switch (passwordStrength) {
            case 'Very Weak':
            case 'Weak':
                return 'strength-weak';
            case 'Medium':
                return 'strength-medium';
            case 'Strong':
                return 'strength-strong';
            case 'Very Strong':
                return 'strength-very-strong';
            default:
                return '';
        }
    };

    return (
        <div className="password-wrapper">
            <div className="gif">
                <img src={passwordGif} alt="Password Gif" />
            </div>
            <div className="tac">
                <h2 className="title">PASSWORD GENERATOR</h2>
                <p className="subtitle">
                    Ensure online account safety by creating strong and secure passwords
                </p>
            </div>
            <div className="password-input-wrapper">
                <div className="password-field">
                    <input type="text" placeholder="your password" value={password} readOnly />
                    <img
                        src={refreshIcon}
                        alt="refresh the password"
                        onClick={generatePassword}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <CopyToClipboard text={password} onCopy={handleCopy}>
                    <button className="copy-btn">
                        <img src={copyIcon} alt="copy password" />
                        {isCopied ? 'Copied' : 'Copy'}
                    </button>
                </CopyToClipboard>
            </div>
            <span className={`fw-500 ${getStrengthClass()}`}>
                Strength: {passwordStrength}
            </span>
            <div className="slider">
                <div>
                    <label id="slider-label">Password Length: </label>
                    <span>{passwordLength}</span>
                </div>
                <Slider
                    max={30}
                    min={5}
                    value={passwordLength}
                    onChange={onChangePasswordLength}
                    className="slider-style"
                />
            </div>
            <div className="elements">
                <Checkbox
                    id="uppercase"
                    label="Uppercase"
                    checked={options.uppercase}
                    onChange={() => setOptions({ ...options, uppercase: !options.uppercase })}
                    name="upper"
                />
                <Checkbox
                    id="lowercase"
                    label="Lowercase"
                    checked={options.lowercase}
                    onChange={() => setOptions({ ...options, lowercase: !options.lowercase })}
                    name="lower"
                />
                <Checkbox
                    id="numbers"
                    label="Numbers"
                    checked={options.numbers}
                    onChange={() => setOptions({ ...options, numbers: !options.numbers })}
                    name="numbers"
                />
                <Checkbox
                    id="special chars"
                    label="Special Characters"
                    checked={options.specialChars}
                    onChange={() => setOptions({ ...options, specialChars: !options.specialChars })}
                    name="specialChars"
                />
            </div>
        </div>
    );
};

export default PasswordGenerator;
