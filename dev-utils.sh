#!/bin/bash

# Development utilities for Model Viewer 3D plugin

show_help() {
    echo "Model Viewer 3D Plugin - Development Utilities"
    echo ""
    echo "Usage: ./dev-utils.sh [command]"
    echo ""
    echo "Commands:"
    echo "  setup       - Run initial setup (same as setup-dev.sh)"
    echo "  start       - Start the WordPress environment"
    echo "  stop        - Stop the WordPress environment"
    echo "  restart     - Restart the WordPress environment"
    echo "  reset       - Reset and restart (destroys data!)"
    echo "  logs        - Show WordPress logs"
    echo "  build       - Build plugin assets"
    echo "  watch       - Watch and rebuild assets on changes"
    echo "  activate    - Activate the plugin"
    echo "  deactivate  - Deactivate the plugin"
    echo "  wp [cmd]    - Run WP-CLI command"
    echo "  info        - Show environment info"
    echo "  clean       - Clean build files and reset environment"
    echo "  test        - Run quick test setup"
    echo "  open        - Open WordPress site in browser"
    echo "  admin       - Open WordPress admin in browser"
    echo ""
}

case "$1" in
    setup)
        ./setup-dev.sh
        ;;
    start)
        echo "🚀 Starting WordPress environment..."
        npm run wp-env:start
        echo "✅ WordPress is running at http://localhost:8888"
        ;;
    stop)
        echo "🛑 Stopping WordPress environment..."
        npm run wp-env:stop
        ;;
    restart)
        echo "🔄 Restarting WordPress environment..."
        npm run wp-env:stop
        npm run wp-env:start
        echo "✅ WordPress is running at http://localhost:8888"
        ;;
    reset)
        echo "⚠️  This will destroy all data. Are you sure? (y/N)"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            echo "🗑️  Resetting WordPress environment..."
            npm run wp-env:reset
            echo "✅ Environment reset complete"
        else
            echo "❌ Reset cancelled"
        fi
        ;;
    logs)
        echo "📋 Showing WordPress logs..."
        npm run wp-env:logs
        ;;
    build)
        echo "🔨 Building plugin assets..."
        npm run build
        echo "✅ Build complete"
        ;;
    watch)
        echo "👀 Watching for changes..."
        npm run dev
        ;;
    activate)
        echo "🔌 Activating plugin..."
        npx wp-env run cli wp plugin activate model-viewer-3d
        ;;
    deactivate)
        echo "🔌 Deactivating plugin..."
        npx wp-env run cli wp plugin deactivate model-viewer-3d
        ;;
    wp)
        shift
        npx wp-env run cli wp "$@"
        ;;
    info)
        echo "📊 Environment Information:"
        echo "  WordPress URL: http://localhost:8888"
        echo "  Admin URL: http://localhost:8888/wp-admin"
        echo "  Admin User: admin / admin"
        echo ""
        echo "🔌 Plugin Status:"
        npx wp-env run cli wp plugin list --name=model-viewer-3d 2>/dev/null || echo "  Plugin not found or environment not running"
        echo ""
        echo "🎨 Active Theme:"
        npx wp-env run cli wp theme list --status=active --field=name 2>/dev/null || echo "  Environment not running"
        echo ""
        echo "💡 Quick links:"
        echo "  - Open site: open http://localhost:8888"
        echo "  - Open admin: open http://localhost:8888/wp-admin"
        ;;
    open)
        echo "🌐 Opening WordPress in browser..."
        if command -v open &> /dev/null; then
            open http://localhost:8888
        elif command -v xdg-open &> /dev/null; then
            xdg-open http://localhost:8888
        else
            echo "Please open http://localhost:8888 in your browser"
        fi
        ;;
    admin)
        echo "🔑 Opening WordPress admin in browser..."
        if command -v open &> /dev/null; then
            open http://localhost:8888/wp-admin
        elif command -v xdg-open &> /dev/null; then
            xdg-open http://localhost:8888/wp-admin
        else
            echo "Please open http://localhost:8888/wp-admin in your browser"
        fi
        ;;
    clean)
        echo "🧹 Cleaning build files..."
        rm -rf build/
        rm -rf node_modules/.cache/
        echo "🗑️  Resetting WordPress environment..."
        npm run wp-env:destroy
        echo "✅ Clean complete"
        ;;
    test)
        echo "🧪 Running test setup..."
        ./test-demo.sh
        ;;
    *)
        show_help
        ;;
esac
