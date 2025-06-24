const buttons = document.querySelectorAll('.button');

buttons.forEach((btn) => {
    btn.addEventListener('mouseover', () => {
        btn.style.backgroundColor = '#04a77c';
    });
    btn.addEventListener('mouseout', () => {
        btn.style.backgroundColor = '#06b488';
    });
});

const getstartBtn = document.querySelector('.get-started');
const loginBtn = document.querySelector('.login_button');
const modal = document.getElementById('login-modal');

getstartBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
});

loginBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
});

const closeBtn = document.querySelector('.close-modal');

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
});

const rotatingText = document.querySelector('.rotating-text');
const words = ['Stocks', 'Mutual Funds', 'Fixed Deposits'];
let index = 0;

setInterval(() => {
  rotatingText.classList.remove('fade-in');//removes
  void rotatingText.offsetWidth; // reflow
  index = (index + 1) % words.length;
  rotatingText.textContent = words[index];
  rotatingText.classList.add('fade-in');//adds
}, 3500);

const conBtn = document.getElementById('subbtn');

conBtn.addEventListener('click', async () => {
  const emailInput = document.getElementById('email-field');
  const email = emailInput.value.trim();
  const emailPattern = /^[A-Za-z0-9._\-]+@[A-Za-z]+\.[a-z]{2,4}$/;
  const errorMessage = document.querySelector('.error-message');
  const line = document.querySelector('.wrap-input-2 .focus-border');

  if (!emailPattern.test(email)) {
    errorMessage.style.display = 'block';
    line.style.bottom = "15px";
    return;
  }

  try {
    const checkRes = await fetch("http://localhost:5050/api/auth/check-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const checkData = await checkRes.json();

    if (checkRes.ok && checkData.exists) {
      alert("User already exists! Redirecting to password page...");
      const modalcontent = document.querySelector('.modal-rightcontent');
      const createPass = document.querySelector('.createpass');
      const createpasUse = document.querySelector('.username321');

      setTimeout(() => {
        modalcontent.style.display = 'none';
        createPass.style.display = 'flex';
        createPass.classList.add('fade-in');
        createpasUse.textContent = email;

        // New code to update heading and button text
        const headingText = document.querySelector('.createpass .heading_texts');
        const createBtn = document.getElementById('createpassbtn');
        headingText.textContent = "Enter Your Password";
        createBtn.textContent = "Verify Password";
      }, 500);
      return; // Stop execution here
    }
  } catch (checkErr) {
    console.error("Error checking user existence:", checkErr);
    alert("⚠️ Server error while checking user. Please try again.");
    return;
  }

  try {
    alert("✅ Sending Otp!");
    const res = await fetch("http://localhost:5050/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      const modalcontent = document.querySelector('.modal-rightcontent');
      const verifyPage = document.querySelector('.verifypage');
      const username = document.querySelector('.username');

      setTimeout(() => {
        modalcontent.classList.add('fade-out');
        modalcontent.style.display = 'none';
        verifyPage.style.display = 'flex';
        verifyPage.classList.add('fade-in');
        username.textContent = email;
      }, 500);
    } else {
      alert(data.message || "Failed to send OTP.");
    }
  } catch (err) {
    console.error("Error sending OTP:", err);
    alert("Error: Could not send OTP.");
  }
});

const verifyBtn = document.getElementById('verifybtn');

verifyBtn.addEventListener('click', async () => {
  const otpInput = document.getElementById('otp-field');
  if (!otpInput) {
    console.error("OTP input not found.");
    alert("Something went wrong. Please reload the page.");
    return;
  }

  const otp = otpInput.value.trim();
  const email = document.querySelector('.username').textContent.trim();

  if (!otp || otp.length !== 6) {
    alert("Please enter a valid 6-digit OTP.");
    return;
  }

  console.log("✅ Sending OTP verification for:", email, otp);

  try {
    const res = await fetch("http://127.0.0.1:5050/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();
    console.log("OTP VERIFY RESPONSE:", data);

    if (res.ok) {
      alert("✅ OTP Verified Successfully!");
      const verifyPage = document.querySelector('.verifypage');
      const createPass = document.querySelector('.createpass');
      const createpasUse = document.querySelector('.username321');

      setTimeout(() => {
        verifyPage.style.display = 'none';
        createPass.style.display = 'flex';
        createPass.classList.add('fade-in');
        createpasUse.textContent = email;
      }, 500);
    } else {
      alert(data.message || "❌ Invalid or expired OTP.");
    }

  } catch (err) {
    console.error("Error verifying OTP:", err.message);
    alert("⚠️ Server error. Please try again.");
  }
});

document.getElementById("createpassbtn").addEventListener("click", async () => {
  const passwordInput = document.getElementById("pass-field");
  const password = passwordInput.value.trim();
  const passRegex = /^[A-Za-z0-9]{8,}$/;

  if (!passRegex.test(password)) {
    alert("Password must be at least 8 characters and alphanumerical.");
    return;
  }

  const email = document.querySelector(".username321").textContent;
  const btnText = document.getElementById("createpassbtn").textContent;

  try {
    if (btnText === "Verify Password") {
      // Existing user → Login instead of register
      const res = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Logged in successfully!");
        window.location.href = "/main/stockss/stockshomepage.html";
      } else {
        alert(data.message || "❌ Incorrect credentials.");
      }
    } else {
      // New user → Register
      const res = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name: "Groww User"
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("🎉 Registered Successfully!");
        window.location.href = "/main/stockss/stockshomepage.html";
      } else {
        alert(data.message || "❌ Registration failed.");
      }
    }
  } catch (err) {
    console.error("Authentication error:", err);
    alert("⚠️ Server error.");
  }
});
