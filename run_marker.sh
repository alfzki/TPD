#!/usr/bin/env bash
set -euo pipefail

# Ensure GEMINI_API_KEY is available
if [ -z "${GEMINI_API_KEY:-}" ]; then
    echo "Error: Environment variable GEMINI_API_KEY is not set." >&2
    exit 1
fi

# Marker reads GOOGLE_API_KEY for Gemini service
export GOOGLE_API_KEY="$GEMINI_API_KEY"

# Surya vLLM tuning for RTX 4050 Laptop GPU (6GB VRAM)
export SURYA_INFERENCE_PARALLEL=2
export VLLM_GPU_MEMORY_UTILIZATION=0.65
export VLLM_GPU_TYPE=t4
export SURYA_INFERENCE_KEEP_ALIVE=true

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

INPUT_DIR="${1:-Materi PDF}"
OUTPUT_DIR="${2:-Materi MD}"

echo "=========================================================="
echo "Marker PDF Conversion"
echo "Input Directory : $INPUT_DIR"
echo "Output Directory: $OUTPUT_DIR"
echo "GPU Accelerator : NVIDIA GeForce RTX 4050 Laptop GPU (CUDA)"
echo "LLM Integration : Google Gemini"
echo "=========================================================="

mkdir -p "$OUTPUT_DIR"

uv run marker "$INPUT_DIR" \
    --output_dir "$OUTPUT_DIR" \
    --use_llm \
    --config_json marker_config.json \
    --workers 1

echo "=========================================================="
echo "Marker conversion process completed successfully!"
echo "Outputs are saved in: $OUTPUT_DIR"
echo "=========================================================="
