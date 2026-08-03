FROM lspahija/comfyui:0.2.5
WORKDIR /app
RUN cd /app/ComfyUI/custom_nodes && git clone https://github.com/ltdrdata/ComfyUI-Manager.git || true
EXPOSE 8188
CMD ["python", "main.py", "--listen", "0.0.0.0", "--port", "8188", "--enable-cors-header", "*"]
