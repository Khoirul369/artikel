let luas;
let keliling;
let lebar;
let panjang;
function hitung() {
	lebar = parseFloat(document.getElementById("ipt_lebar").value);
	panjang = parseFloat(document.getElementById("ipt_panjang").value);
	luas = panjang * lebar;
	keliling = 2 * (panjang + lebar);
	document.getElementById('opt_luas').value = luas;
	document.getElementById('opt_keliling').value = keliling;
}