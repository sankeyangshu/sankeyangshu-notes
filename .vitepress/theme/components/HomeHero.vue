<template>
  <div class="hero">
    <div class="container">
      <img class="avatar" src="/avatar.png" alt="avatar" />
      <span class="label">⭐</span>
    </div>
    <div>
      <p class="introduce">Hi, I'm sankeyangshu.👋</p>
      <p class="tips">A Frontend Developer, Hope my blog can help you.😎</p>
      <div class="contact">
        <a class="link" href="/about#contact-me"> <i>contact me</i> ❤️</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 70px;
  font-weight: bold;
  font-size: 1.5em;
}

.container {
  position: relative;
}

.avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 0 20px 20px var(--vp-c-brand);
  background-color: var(--vp-c-brand);
  position: relative;
}

.label {
  position: absolute;
  right: 10px;
  bottom: 10px;
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.introduce {
  font-size: 28px;
  margin-top: 70px;
  color: var(--vp-c-brand);
  margin-bottom: 20px;
}

.tips {
  font-size: 18px;
}

.avatar:hover {
  animation: 5s linear 0s infinite spin;
}

.contact {
  margin-top: 20px;
}

.link {
  display: inline-block;
  width: auto;
  border-radius: 10px;
  padding: 5px 10px;
  box-shadow: 8px 8px 16px var(--vp-c-bg-1), -8px -8px 16px var(--vp-c-bg-2);
}

.link:hover {
  color: var(--vp-c-brand);
  box-shadow: inset 8px 8px 16px var(--vp-c-bg-1), inset -8px -8px 16px var(--vp-c-bg-2);
}

@keyframes spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
