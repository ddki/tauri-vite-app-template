#[tauri::command]
pub fn greet(name: &str) -> String {
    println!("arg = {}", name);
    format!("Hello, {}!", name)
}
