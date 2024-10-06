export const validateLogin = (emailId, password) => {
    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailId);
    const isPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if (!isEmail) {
        return (
            <p className="text-red-800">
                Please enter a valid email address.
            </p>
        );
    }

    if (!isPassword) {
        return (
            <p className="text-red-800">
                Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.(Example@123)
            </p>
        );
    }

    return null;
};
