use deno_core::plugin_api::*;
use dlopen::symbor::Library;
use libc::c_char;
use std::ffi::CString;
use std::rc::Rc;

pub type GoDenoFn = extern "C" fn(arg: *const c_char);

#[doc(hidden)]
#[no_mangle]
pub fn deno_plugin_init(iface: &mut dyn Interface) {
    iface.register_op("godeno::call", call_op);
}

fn call_op(_iface: &mut dyn Interface, buf: &mut [ZeroCopyBuf]) -> Op {
    let lib_path = String::from_utf8(Vec::from(&*buf[0]));
    let sym_name = String::from_utf8(Vec::from(&*buf[1]));
    let arg = String::from_utf8(Vec::from(&*buf[2]));
    if let Err(e) = lib_path {
        eprintln!("Cannot convert the library path: {:?}", e);
        return Op::Sync(vec![].into_boxed_slice());
    }
    if let Err(e) = arg {
        eprintln!("Cannot convert the symbol name: {:?}", e);
        return Op::Sync(vec![].into_boxed_slice());
    }
    if let Err(e) = sym_name {
        eprintln!("Cannot convert argument: {:?}", e);
        return Op::Sync(vec![].into_boxed_slice());
    }
    let sym_name = sym_name.unwrap();
    let lib_path = lib_path.unwrap();
    let arg = arg.unwrap();
    let lib = Library::open(lib_path);
    if let Err(e) = lib {
        eprintln!("Cannot open the library: {:?}", e);
        return Op::Sync(vec![].into_boxed_slice());
    }
    let lib = lib.unwrap();
    let l = Rc::new(lib);
    let sym = unsafe { l.symbol::<GoDenoFn>(&sym_name) };
    if let Err(e) = sym {
        eprintln!("Cannot find the init symbol: {:?}", e);
        return Op::Sync(vec![].into_boxed_slice());
    }
    let sym = sym.unwrap();
    sym(CString::new(arg).unwrap().as_ptr());
    Op::Sync(vec![].into_boxed_slice())
}
