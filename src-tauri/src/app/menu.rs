use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, WindowMenuEvent};
use webbrowser;

pub fn build_menu() -> Menu {
    let setting = CustomMenuItem::new("setting", "设置");
    let about: Submenu = about_menu();

    Menu::new()
        .add_item(setting)
        .add_submenu(about)
        .add_native_item(MenuItem::Quit)
}

pub fn handle_menu_event(event: WindowMenuEvent) {
    match event.menu_item_id() {
        "setting" => {
            println!("setting...");
        }
        "about" => {
            println!("about...");
        }
        "wiki" => {
            println!("wiki...");
        }
        "issues" => {
            if !webbrowser::open("https://github.com/ddki/tauri-vite-app-demo/issues").is_ok() {
                print!("打开失败")
            }
        }
        "github" => {
            if !webbrowser::open("https://github.com/ddki/tauri-vite-app-demo").is_ok() {
                print!("打开失败")
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
