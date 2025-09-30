import React, { useState, useCallback, useMemo } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Pressable,
    Animated,
    Modal,
    StatusBar,
    SafeAreaView,
    Dimensions,
    Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { COLORS, SHADOWS, SPACING, FONT_SIZES, FONT_WEIGHTS } from "../constants/theme";

// Constants
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH_RATIO = 0.85;
const ANIMATION_CONFIG = {
    OPEN: {
        overlay: { duration: 300, easing: Easing.out(Easing.quad) },
        drawer: { duration: 400, easing: Easing.out(Easing.cubic) },
    },
    CLOSE: {
        drawer: { duration: 300, easing: Easing.in(Easing.cubic) },
        overlay: { duration: 250, easing: Easing.in(Easing.quad) },
    },
};

const USER_INFO = {
    name: "Welcome back!",
    email: "user@example.com",
};

interface MenuOption {
    id: string;
    title: string;
    icon: string;
    onPress: () => void;
    color?: string;
}

interface UserMenuProps {
    /** Controls the visibility of the drawer */
    visible: boolean;
    /** Callback fired when the drawer should be closed */
    onClose: () => void;
}

/**
 * UserMenu - A slide-in drawer component for user navigation
 *
 * Features:
 * - Smooth slide animations with proper easing
 * - Configurable menu options
 * - Responsive overlay with touch handling
 * - Clean, maintainable code structure
 */

export default function UserMenu({ visible, onClose }: UserMenuProps) {
    const router = useRouter();
    const [slideAnim] = useState(new Animated.Value(SCREEN_WIDTH * DRAWER_WIDTH_RATIO));
    const [overlayOpacity] = useState(new Animated.Value(0));
    const [isAnimating, setIsAnimating] = useState(false);

    const handleCloseAnimation = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);

        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: SCREEN_WIDTH * DRAWER_WIDTH_RATIO,
                ...ANIMATION_CONFIG.CLOSE.drawer,
                useNativeDriver: true,
            }),
            Animated.timing(overlayOpacity, {
                toValue: 0,
                ...ANIMATION_CONFIG.CLOSE.overlay,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsAnimating(false);
            onClose();
        });
    }, [isAnimating, slideAnim, overlayOpacity, onClose]);

    React.useEffect(() => {
        if (visible) {
            slideAnim.setValue(SCREEN_WIDTH * DRAWER_WIDTH_RATIO);
            overlayOpacity.setValue(0);
            setIsAnimating(false);

            Animated.parallel([
                Animated.timing(overlayOpacity, {
                    toValue: 1,
                    ...ANIMATION_CONFIG.OPEN.overlay,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    ...ANIMATION_CONFIG.OPEN.drawer,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible, slideAnim, overlayOpacity]);

    // Helper function to create menu action with animation
    const createMenuAction = useCallback((action?: () => void) => () => {
        handleCloseAnimation();
        action?.();
    }, [handleCloseAnimation]);

    // Menu configuration - easier to maintain and modify
    const menuOptions: MenuOption[] = useMemo(() => [
        {
            id: "settings",
            title: "Settings",
            icon: "settings-outline",
            onPress: createMenuAction(() => router.push("/settings")),
        },
        {
            id: "about",
            title: "About",
            icon: "information-circle-outline",
            onPress: createMenuAction(() => router.push("/about")),
        },
        {
            id: "privacy",
            title: "Privacy & Security",
            icon: "shield-checkmark-outline",
            onPress: createMenuAction(() => console.log("Privacy clicked")),
        },
        {
            id: "help",
            title: "Help & Support",
            icon: "help-circle-outline",
            onPress: createMenuAction(() => console.log("Help clicked")),
        },
        {
            id: "divider",
            title: "",
            icon: "",
            onPress: () => { },
        },
        {
            id: "signout",
            title: "Sign Out",
            icon: "log-out-outline",
            color: COLORS.error,
            onPress: createMenuAction(() => console.log("Sign out clicked")),
        },
    ], [createMenuAction, router]);

    const renderMenuItem = useCallback((option: MenuOption) => {
        if (option.id === "divider") {
            return <View key="divider" style={styles.divider} />;
        }

        const textColor = option.color || COLORS.textPrimary;

        return (
            <TouchableOpacity
                key={option.id}
                style={styles.menuItem}
                onPress={option.onPress}
                activeOpacity={0.7}
            >
                <View style={styles.menuItemContent}>
                    <Ionicons
                        name={option.icon as any}
                        size={24}
                        color={textColor}
                        style={styles.menuIcon}
                    />
                    <Text style={[styles.menuText, { color: textColor }]}>
                        {option.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }, []);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={handleCloseAnimation}
            statusBarTranslucent
        >
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="light-content" />

            <View style={StyleSheet.absoluteFillObject}>
                {/* Touch overlay - always responsive */}
                <Pressable
                    style={StyleSheet.absoluteFillObject}
                    onPress={handleCloseAnimation}
                />

                {/* Animated overlay background - visual only */}
                <Animated.View
                    style={[
                        styles.overlay,
                        {
                            opacity: overlayOpacity,
                        },
                    ]}
                    pointerEvents="none"
                />

                {/* Drawer */}
                <Animated.View
                    style={[
                        styles.drawerContainer,
                        {
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                >
                    <Pressable style={styles.drawerContent} onPress={() => { }}>
                        <SafeAreaView style={styles.drawerInner}>
                            {/* Header */}
                            <View style={styles.drawerHeader}>
                                <Text style={styles.drawerTitle}></Text>
                            </View>

                            {/* User Info */}
                            <View style={styles.userSection}>
                                <View style={styles.userAvatar}>
                                    <Ionicons name="person" size={32} color={COLORS.white} />
                                </View>
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{USER_INFO.name}</Text>
                                    <Text style={styles.userEmail}>{USER_INFO.email}</Text>
                                </View>
                            </View>

                            {/* Menu Items */}
                            <View style={styles.menuSection}>
                                {menuOptions.map(renderMenuItem)}
                            </View>
                        </SafeAreaView>
                    </Pressable>
                </Animated.View>
            </View>
        </Modal>
    );
}

// Style constants
const DRAWER_STYLES = {
    width: SCREEN_WIDTH * DRAWER_WIDTH_RATIO,
    maxWidth: 350,
    elevation: 16,
};

const styles = StyleSheet.create({
    // Layout styles
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    drawerContainer: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: DRAWER_STYLES.width,
        maxWidth: DRAWER_STYLES.maxWidth,
        backgroundColor: COLORS.white,
        ...SHADOWS.large,
        elevation: DRAWER_STYLES.elevation,
    },
    // Drawer structure styles
    drawerContent: {
        flex: 1,
    },
    drawerInner: {
        flex: 1,
    },

    // Header styles
    drawerHeader: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.neutral,
    },
    drawerTitle: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.textPrimary,
    },

    // User section styles
    userSection: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.xl,
        backgroundColor: COLORS.primaryBackground,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.neutral,
    },
    userAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: SPACING.md,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: FONT_SIZES.lg,
        fontWeight: FONT_WEIGHTS.semibold,
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    userEmail: {
        fontSize: FONT_SIZES.sm,
        color: COLORS.textTertiary,
    },
    // Menu styles
    menuSection: {
        flex: 1,
        paddingTop: SPACING.md,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        minHeight: 56,
    },
    menuItemContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    menuIcon: {
        marginRight: SPACING.md,
        width: 24,
    },
    menuText: {
        fontSize: FONT_SIZES.md,
        fontWeight: FONT_WEIGHTS.medium,
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.neutral,
        marginVertical: SPACING.sm,
        marginHorizontal: SPACING.lg,
    },
});