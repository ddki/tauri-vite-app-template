#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod app;
pub mod utils;
use tauri::{Manager, WindowMenuEvent};

use crate::app::menu;

#[derive(Clone, serde::Serialize)]
struct Payload {
    message: String,
}
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_window::init())
        .system_tray(app::system_tray::build())
        .on_system_tray_event(app::system_tray::handle_menu_event)
        .invoke_handler(tauri::generate_handler![
            app::event::greet,
            app::window::close_splashscreen
        ])
        .menu(menu::build_menu())
        .on_menu_event(|event: WindowMenuEvent| menu::handle_menu_event(event))
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();
            main_window.close_devtools();
            // listen to the `event-name` (emitted on any window)
            let id = app.listen_global("listen_global", |event| {
                println!("got click with payload {:?}", event.payload());
            });
            // unlisten to the event using the `id` returned on the `listen_global` function
            // a `once_global` API is also exposed on the `App` struct
            app.unlisten(id);

            // emit the `event-name` event to all webview windows on the frontend
            app.emit_all(
                "click_emit",
                Payload {
                    message: "Tauri is awesome!".into(),
                },
            )
            .unwrap();
            Ok(())
        })
        // 保持前端在后台运行，以实现系统托盘左击显示窗口
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                event.window().hide().unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        // 保持后端在后台运行
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
        });
}
