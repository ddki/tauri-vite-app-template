use tauri::{CustomMenuItem, Manager, Menu, MenuItem, Submenu, WindowMenuEvent};

pub fn build_menu() -> Menu {
    let main = CustomMenuItem::new("main", "主页");
    let setting = CustomMenuItem::new("setting", "设置");
    let about: Submenu = about_menu();

    Menu::new()
        .add_item(main)
        .add_item(setting)
        .add_submenu(about)
        .add_native_item(MenuItem::Quit)
        .add_submenu(example_menu())
}

pub fn handle_menu_event(event: WindowMenuEvent) {
    match event.menu_item_id() {
        "main" => {
            let window = event.window().get_window("main").unwrap();
            window.eval("window.location.replace('#/')").unwrap();
        }
        "setting" => {
            let window = event.window().get_window("main").unwrap();
            window.eval("window.location.replace('#/setting')").unwrap();
        }
        "about" => {
            let window = event.window().get_window("main").unwrap();
            super::window::open_window(window, "about");
        }
        "wiki" => {
            let window = event.window().get_window("main").unwrap();
            super::window::open_window(window, "wiki");
        }
        "issues" => {
            if !webbrowser::open("https://github.com/ddki/tauri-vite-app-demo/issues").is_ok() {
                print!("打开失败");
            }
        }
        "github" => {
            if !webbrowser::open("https://github.com/ddki/tauri-vite-app-demo").is_ok() {
                print!("打开失败");
            }
        }
        "check_update" => {
            println!("check_update...");
        }
        "quit" => {
            std::process::exit(0);
        }
        "close" => {
            event.window().close().unwrap();
        }
        // 例子
        "call_font" => event
            .window()
            .app_handle()
            .emit_all("fontGrobalListenEvent", "rust 调用 vue")
            .unwrap(),
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
            .add_item(CustomMenuItem::new("check_update", "检查更新")),
    )
}

fn example_menu() -> Submenu {
    Submenu::new(
        "例子",
        Menu::new().add_item(CustomMenuItem::new("call_font", "调用前端")),
    )
}
