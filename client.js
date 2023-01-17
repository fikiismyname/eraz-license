const checkLicense = async () => {
  try {
    // Ambil root domain dengan menghapus semua bagian setelah tanda titik
    const rootDomain = new URL(window.location.href).hostname;
    // Kirim permintaan ke server untuk mengecek status license
    const response = await fetch(
      `http://localhost:3000/validate-license/${rootDomain}`
    );
    const data = await response.json();
    if (data.message === "License valid!") {
      console.log("License valid");
      return;
    } else {
      console.log("License expired or invalid");
      window.location.replace("https://www.fikiismyname.com/");
    }
  } catch (error) {
    // Jika terjadi kesalahan, tampilkan pesan error
    console.log("Error checking license status: ", error);
  }
};

// Panggil fungsi checkLicense saat halaman dimuat
window.onload = checkLicense;
