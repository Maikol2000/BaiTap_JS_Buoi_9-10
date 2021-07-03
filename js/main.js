var dsnv = new DanhSachNhanVien();
console.log(dsnv);
var validator = new Validator();
function getElm(id) {
  return document.getElementById(id);
}

var luongNV = function(chucVu, luongCB) {
  var tongLuong = 0
  if (chucVu === "Sếp") {
    tongLuong = 3 * luongCB;
  }
  if (chucVu === "Trưởng phòng") {
    tongLuong = 2 * luongCB;
  }
  if (chucVu === "Nhân viên") {
    tongLuong = luongCB;
  }
  return tongLuong
}
var loaiNhanVien = function(gioLam) {
  var xepLoai = ''
  if (gioLam >= 192) {
    xepLoai = "Nhân viên Xuất Sắc";
  }
  if (gioLam < 192 && gioLam >= 176) {
    xepLoai = "Nhân viên Giỏi";
  }
  if (gioLam < 176 && gioLam >= 160) {
    xepLoai = "Nhân viên Khá";
  }
  if (gioLam < 160) {
    xepLoai = "Nhân viên Trung Bình";
  }
  return xepLoai
}
var hienThiDanhSachNV = function (arr) {
  var content = "";
  arr.map(function (nv, index) {
    content += `
                <tr>
                    <td id= 'nvTaiKhoan'>${nv.taiKhoan}</td>
                    <td id= 'nvHoTen'>${nv.hoTen}</td>
                    <td id= 'nvEmail'>${nv.email}</td>
                    <td id= 'nvNgayLam'>${nv.ngayLam}</td>
                    <td id= 'nvChucVu'>${nv.chucVu}</td>
                    <td id= 'nvTongLuong'>${nv.tongLuong}</td>
                    <td id= 'nvXepLoai'>${nv.xepLoai}</td>
                    <td>
                        <button class="btn btn-info" data-toggle="modal"
                        data-target="#myModal" onclick = "_suaDanhSachNV(${index})" >Sửa</button>
                        <button class="btn btn-danger"  onclick = "_xoaDanhSachNV('${nv.taiKhoan}')">Xóa</button>
                    </td>
                </tr>
        `;
  });
  getElm("tableDanhSach").innerHTML = content;
};

// lưu vào localStorage
var setLocalStorage = function () {
  localStorage.setItem("DSNV", JSON.stringify(dsnv.arr));
};
var getLocalStorage = function () {
  if (localStorage.getItem("DSNV")) {
      dsnv.arr = JSON.parse(localStorage.getItem("DSNV"));
      hienThiDanhSachNV(dsnv.arr);
  }
};

getLocalStorage();


// sửa danh sách
function _suaDanhSachNV(index) {
  getElm("btnCapNhat").style.display = "block";
  getElm("btnThemNV").style.display = "none";

  var indexNV = dsnv.arr[index];

  getElm("tknv").value = indexNV.taiKhoan;
  getElm("name").value = indexNV.hoTen;
  getElm("email").value = indexNV.email;
  getElm("password").value = indexNV.matKhau;
  getElm("datepicker").value = indexNV.ngayLam;
  getElm("luongCB").value = indexNV.luongCB;
  getElm("chucvu").value = indexNV.chucVu;
  getElm("gioLam").value = indexNV.gioLam;
  var tongLuong = indexNV.tongLuong;
  var xepLoai = indexNV.xepLoai;


// cặp nhật
  getElm("btnCapNhat").addEventListener("click", function (index) {
  var indexNV = dsnv.arr[index];

  var taiKhoanNV = getElm("tknv").value;
  var tenNV = getElm("name").value;
  var email = getElm("email").value;
  var matKhau = getElm("password").value;
  var ngayLam = getElm("datepicker").value;
  var luongCB = getElm("luongCB").value;
  var chucVu = getElm("chucvu").value;
  var gioLam = getElm("gioLam").value;
  var tongLuong = luongNV(chucVu, luongCB)
  var xepLoai = loaiNhanVien(gioLam)

  var isValid = true;

  isValid &=
    validator.kiemTraRong(taiKhoanNV, "tbTKNV", "Không để trống") &&
    validator.kiemTraDoDaiKiTu(
      taiKhoanNV,
      "tbTKNV",
      "Không được nhập bé hơn 4 và dài hơn 6 kí tự",
      4,
      6
    );

  isValid = validator.kiemTraOP(
    chucVu,
    "tbChucVu",
    "Vui lòng chọn một chức vụ"
  );
  isValid &=
    validator.kiemTraRong(gioLam, "tbGiolam", "Không để trống") &&
    validator.kiemTraDoDaiSO(
      gioLam,
      "tbGiolam",
      "Vui lòng nhập lại thời gian làm",
      80,
      200
    );
  isValid &=
    validator.kiemTraRong(tenNV, "tbTen", "Không để trống") &&
    validator.kiemTraChuoi(tenNV, "tbTen", "Vui lòng nhập chữ");
  isValid &=
    validator.kiemTraRong(email, "tbEmail", "Không để trống") &&
    validator.kiemTraKiTuEmail(email, "tbEmail", "kí tự không hợp lệ");
  isValid &=
    validator.kiemTraRong(matKhau, "tbMatKhau", "Không để trống") &&
    validator.kiemTraDoDaiKiTu(
      matKhau,
      "tbMatKhau",
      "Không được nhập bé hơn 4 và dài hơn 10 kí tự",
      6,
      10
    ) &&
    validator.kiemTraKyTuMK(
      matKhau,
      "tbMatKhau",
      "Nhập ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );
  isValid &=
    validator.kiemTraRong(ngayLam, "tbNgay", "Không để trống") &&
    validator.kiemTraKiTuNL(
      ngayLam,
      "tbNgay",
      "Nhập theo thứ tự ngày/tháng/năm"
    );
  isValid &=
    validator.kiemTraRong(luongCB, "tbLuongCB", "Không để trống") &&
    validator.kiemTraLuongCB(luongCB, "tbLuongCB", "Vui Lòng nhập số") &&
    validator.kiemTraDoDaiSO(
      luongCB,
      "tbLuongCB",
      "Vui lòng nhập lại lương",
      1000000,
      20000000
    );
    getElm('nvHoTen').innerHTML = tenNV
    getElm('nvEmail').innerHTML = email
    getElm('nvTaiKhoan').innerHTML = taiKhoanNV
    getElm('nvTongLuong').innerHTML = tongLuong
    getElm('nvNgayLam').innerHTML = ngayLam
  if (!isValid) return;

  getElm('nvChucVu').innerHTML = chucVu
  getElm('nvXepLoai').innerHTML = xepLoai


  
  })

  hienThiDanhSachNV(dsnv.arr);
  setLocalStorage();
}
//


// xóa nhân viên
function _xoaDanhSachNV(taiKhoanNV) {
  dsnv.xoaNhanVien(taiKhoanNV);
  hienThiDanhSachNV(dsnv.arr);
  setLocalStorage();
}
//
getElm("btnThem").addEventListener("click", function () {
  getElm("btnCapNhat").style.display = "none";
  getElm("btnThemNV").style.display = "block";
  getElm("form").reset();
});
//

// Thêm Nhân Viên
var themNV = getElm("btnThemNV").addEventListener("click", function () {

  var taiKhoanNV = getElm("tknv").value;
  var tenNV = getElm("name").value;
  var email = getElm("email").value;
  var matKhau = getElm("password").value;
  var ngayLam = getElm("datepicker").value;
  var luongCB = getElm("luongCB").value;
  var chucVu = getElm("chucvu").value;
  var gioLam = getElm("gioLam").value;
  var xepLoai;

  var isValid = true;

  isValid &=
    validator.kiemTraRong(taiKhoanNV, "tbTKNV", "Không để trống") &&
    validator.kiemTraDoDaiKiTu(
      taiKhoanNV,
      "tbTKNV",
      "Không được nhập bé hơn 4 và dài hơn 6 kí tự",
      4,
      6
    );

  isValid = validator.kiemTraOP(
    chucVu,
    "tbChucVu",
    "Vui lòng chọn một chức vụ"
  );
  isValid &=
    validator.kiemTraRong(gioLam, "tbGiolam", "Không để trống") &&
    validator.kiemTraDoDaiSO(
      gioLam,
      "tbGiolam",
      "Vui lòng nhập lại thời gian làm",
      80,
      200
    );
  isValid &=
    validator.kiemTraRong(tenNV, "tbTen", "Không để trống") &&
    validator.kiemTraChuoi(tenNV, "tbTen", "Vui lòng nhập chữ");
  isValid &=
    validator.kiemTraRong(email, "tbEmail", "Không để trống") &&
    validator.kiemTraKiTuEmail(email, "tbEmail", "kí tự không hợp lệ");
  isValid &=
    validator.kiemTraRong(matKhau, "tbMatKhau", "Không để trống") &&
    validator.kiemTraDoDaiKiTu(
      matKhau,
      "tbMatKhau",
      "Không được nhập bé hơn 4 và dài hơn 10 kí tự",
      6,
      10
    ) &&
    validator.kiemTraKyTuMK(
      matKhau,
      "tbMatKhau",
      "Nhập ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );
  isValid &=
    validator.kiemTraRong(ngayLam, "tbNgay", "Không để trống") &&
    validator.kiemTraKiTuNL(
      ngayLam,
      "tbNgay",
      "Nhập theo thứ tự ngày/tháng/năm"
    );
  isValid &=
    validator.kiemTraRong(luongCB, "tbLuongCB", "Không để trống") &&
    validator.kiemTraLuongCB(luongCB, "tbLuongCB", "Vui Lòng nhập số") &&
    validator.kiemTraDoDaiSO(
      luongCB,
      "tbLuongCB",
      "Vui lòng nhập lại lương",
      1000000,
      20000000
    );

  if (!isValid) return;
  var tongLuong = luongNV(chucVu, luongCB)
  var xepLoai = loaiNhanVien(gioLam)
  

  var nhanVien = new NhanVien(
    taiKhoanNV,
    tenNV,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam,
    tongLuong,
    xepLoai
  );
  dsnv.themNhanVien(nhanVien);
  hienThiDanhSachNV(dsnv.arr);
  setLocalStorage();
});