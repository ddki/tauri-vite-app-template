use tauri::{AppHandle, Manager, Menu};

#[tauri::command]
pub async fn close_splashscreen(window: tauri::Window) {
    println!("close-splashscreen");
    // Close splashscreen
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().unwrap();
    }
    // Show main window
    window.get_window("main").unwrap().show().unwrap();
}

pub fn open_setting(app: AppHandle) {
    println!("open_setting...");
    crate::utils::create_window(app, "setting", "设置", "#/setting", Menu::default());
}

pub fn open_about(app: AppHandle) {
    println!("open_about...");
    crate::utils::create_window(app, "about", "关于", "#/about", Menu::default());
}
