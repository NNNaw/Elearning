import { actionTypes } from '../Contants/QuanLyNguoiDungConstant';
import { settings } from '../../Commons/Settings';
import axios from 'axios';
import swal from 'sweetalert';

export const dangNhapNguoiDungAction = (user, checkRemeber, handleLogin) => {

    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/DangNhap`,
            method: 'POST',
            data: user
        }).then(result => {

            if (checkRemeber) {//kiểm trả user cho phép nhớ mật khẩu hay không
                localStorage.setItem(settings.userLogin, JSON.stringify(result.data));
                localStorage.setItem(settings.token, result.data.accessToken)
            }
            dispatch({
                type: actionTypes.DANG_NHAP,
                taiKhoan: result.data,
            })
            handleLogin()
        }).catch(error => {
            // console.log(error.response.data)
            swal("Thông báo đăng nhập!", error.response.data, "error");
        })
    }
}

export const dangKyNguoiDungAction = (user, handleClear) => {

    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/DangKy',
            method: 'POST',
            data: user
        }).then(result => {
            console.log(result.data);


            swal({
                icon: "success",
                title: "Đăng ký thành công",

            })
            handleClear();

        }).catch(error => {
            console.log(error.response)
            swal({
                icon: "warning",
                title: "Đăng ký không thành công.",
                text: error.response.data,
                dangerMode: true,
            });
        })
    }
}

export const dangKyKhoaHocAction = (taiKhoan, maKhoaHoc) => {

    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyKhoaHoc/DangKyKhoaHoc',
            method: 'POST',
            data: {
                taiKhoan,
                maKhoaHoc
            },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {

            swal({
                icon: "success",
                title: "Đăng ký thành công",

            })
        }).catch(error => {
            console.log(error.response)
            swal({
                icon: "warning",
                title: "Đăng ký không thành công.",
                text: error.response.data,
                dangerMode: true,
            });
        })
    }
}

export const layThongtinTaiKhoanAction = (taiKhoan) => {

    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/ThongTinTaiKhoan',
            method: 'POST',
            data: { taiKhoan },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            dispatch({
                type: actionTypes.LAY_THONG_TIN_TAI_KHOAN,
                thongTinTaiKhoan: result.data
            })
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const CapNhatThongTinNguoiDungAction = (user) => {

    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
            method: 'PUT',
            data: {
                "taiKhoan": user.taiKhoan,
                "matKhau": user.matKhau,
                "hoTen": user.hoTen,
                "soDT": user.soDT,
                "maLoaiNguoiDung": user.maLoaiNguoiDung,
                "maNhom": settings.groupID,
                "email": user.email
            },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data)
            swal({
                icon: "success",
                title: "Cập nhật thành công",
                buttons: false,
                timer: 1000,
            })
            dispatch(layThongtinTaiKhoanAction(user.taiKhoan))
        }).catch(error => {
            console.log(error.response)
        })
    }
}
export const layDanhSachNguoiTaoAction = () => {
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${settings.groupID}`,
            method: 'GET',
        }).then(result => {
            //Sau khi lấy dữ liệu người dùng về từ api => đưa dữ liệu lên reducer
            dispatch({
                type: actionTypes.LAY_DANH_SACH_NGUOI_TAO,
                mangNguoiDung: result.data.filter(nd => nd.maLoaiNguoiDung === 'GV')
            })

        }).catch(error => {
            console.log(error.response.data);
        })
    }
}

