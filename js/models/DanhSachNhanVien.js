function DanhSachNhanVien() {
    this.arr = [];
    this.themNhanVien = function(nhanVien) {
        this.arr.push(nhanVien)
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
