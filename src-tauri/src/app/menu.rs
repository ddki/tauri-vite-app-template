use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, WindowMenuEvent};

pub fn build_menu() -> Menu {
    let setting = CustomMenuItem::new("setting", "设置");
    let about = about_menu();

    Menu::new()
        .add_item(setting)
        .add_submenu(about)
        .add_native_item(MenuItem::Quit)
}

pub fn handle_menu_event(event: WindowMenuEvent) {
    match event.menu_item_id() {
        "quit" => {
            std::process::exit(0);
        }
        "close" => {
            event.window().close().unwrap();
        }
        _ => {}
    }
}

fn about_menu() -> Submenu {
    Submenu::new(
        "关于",
        Menu::new()
            .add_item(CustomMenuItem::new("about", "关于"))
            .add_item(CustomMenuItem::new("wiki", "文档"))
            .add_item(CustomMenuItem::new("issues", "Issues"))
            .add_item(CustomMenuItem::new("github", "Github"))
            .add_item(CustomMenuItem::new("checkUpdate", "检查更新")),
    )
}
