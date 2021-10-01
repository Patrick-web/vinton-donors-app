<template>
  <div class="choice page">
    <div>
      <h2 class="abs_center_xy">Donor</h2>
      <router-link to="/donor_login">
        <svg
          width="414"
          height="523"
          viewBox="0 0 414 523"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="sv_t"
        >
          <path d="M0 0H414V353L0 523V0Z" fill="#E6006E" />
        </svg>
      </router-link>
    </div>
    <div>
      <h2 class="abs_center_xy">Hospital</h2>
      <router-link to="/institute_login">
        <svg
          width="414"
          height="523"
          viewBox="0 0 414 523"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="sv_b"
        >
          <path d="M414 523H0L0 170L414 0L414 523Z" fill="#F71558" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.choice {
  div {
    height: 50%;
    position: relative;
    h2 {
      z-index: 2;
      font-size: 3rem;
      color: white;
      pointer-events: none;
    }
    .sv_t {
      position: absolute;
      transform: translateY(-8%);
    }
    .sv_b {
      position: absolute;
      transform: translateY(-18%);
    }
    svg:hover {
      filter: brightness(0.7);
    }
  }
}
</style>
