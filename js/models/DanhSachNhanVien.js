function DanhSachNhanVien() {
    this.arr = [];
    this.themNhanVien = function(nhanVien) {
        this.arr.push(nhanVien)
    }
    this.timKiemSP = function(dsnv, chuoiKT) {
        return dsnv.filter(function(nhanVien) {
          return nhanVien.xepLoai.toLowerCase().indexOf(chuoiKT.toLowerCase()) !== -1;
        })
      }
}

DanhSachNhanVien.prototype.timViTri = function(taiKhoanNV) {
    return this.arr.findIndex(function(item) {
        return taiKhoanNV === item.taiKhoan;
    });
}

DanhSachNhanVien.prototype.xoaNhanVien = function(taiKhoanNV) {
        var viTri = this.timViTri(taiKhoanNV);
        if (viTri !== -1) {
            this.arr.splice(viTri, 1);
        }
}
