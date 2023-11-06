document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.querySelector('.login-container');
    const registerContainer = document.querySelector('.register-container');
    const enterroomContainer = document.querySelector('.enterroom-container');
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const registerSubmitButton = document.getElementById('registerSubmitButton');
    const resetButton = document.getElementById('resetButton');

    // 注册界面重置按钮
    resetButton.addEventListener('click', () =>{
        document.getElementById('registerUsername').value = '';
        document.getElementById('registerPassword').value = '';
        document.getElementById('registerComfirmPassword').value = '';
    });

    // 登录页面登录按钮
    loginButton.addEventListener('click', () => {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // 从localStorage中获取已有的账号密码对
        const existingAccounts = JSON.parse(localStorage.getItem('accounts')) || {};

        // 检查输入的账号和密码是否匹配
        if (existingAccounts[username] === password) {
            // 登录成功，执行相关操作
            alert('登录成功！');
            localStorage.setItem('now_username', username);
            loginContainer.classList.remove('active');
            enterroomContainer.classList.add('active');
        } else {
            // 登录失败，执行相关操作
            alert('登录失败，请检查账号和密码！');
        }
    });

    // 登录界面注册按钮
    registerButton.addEventListener('click', () => {
        loginContainer.classList.remove('active');
        registerContainer.classList.add('active');
    });

    // 注册界面提交按钮
    registerSubmitButton.addEventListener('click', () => {

        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const comfirmpassword = document.getElementById('registerComfirmPassword').value;

        if (password == comfirmpassword) {
            // 从localStorage中获取已有的账号密码对（如果存在）
            const existingAccounts = JSON.parse(localStorage.getItem('accounts')) || {};

            // 将新的账号密码对添加到对象中
            existingAccounts[username] = password;

            // 存储更新后的对象到localStorage
            localStorage.setItem('accounts', JSON.stringify(existingAccounts));

            console.log('注册的账号：', username);
            console.log('注册的密码：', password);

            // 清空输入字段
            document.getElementById('registerUsername').value = '';
            document.getElementById('registerPassword').value = '';
            document.getElementById('registerComfirmPassword').value = '';

            registerContainer.classList.remove('active');
            loginContainer.classList.add('active');
            alert('注册成功！');
        } else {
            alert('注册失败，请检查两次密码是否输入相同！')
        }
    });
});
