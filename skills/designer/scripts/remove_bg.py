import sys
from PIL import Image

def remove_background(input_path, output_path, threshold=220):
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()
        
        new_data = []
        for item in data:
            # If r, g, b are all above threshold, it's white/near-white
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Success: Background removed and saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python remove_bg.py <input_path> <output_path> [threshold]")
        sys.exit(1)
    
    threshold = int(sys.argv[3]) if len(sys.argv) > 3 else 220
    remove_background(sys.argv[1], sys.argv[2], threshold)
